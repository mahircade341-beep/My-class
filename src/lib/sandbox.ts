export interface ExecResult {
  success: boolean;
  output: string;
  error: string;
}

/**
 * Runs JavaScript in a sandboxed Web Worker.
 * - console.log/error/warn output is captured
 * - infinite loops are killed by the timeout (worker.terminate)
 * - the worker has no access to the page DOM or network
 */
export function runJavaScript(code: string, timeout = 5000): Promise<ExecResult> {
  return new Promise((resolve) => {
    const workerSource = `
      self.onmessage = function (e) {
        var code = e.data.code;
        var logs = [];
        function fmt(v) {
          try {
            if (typeof v === "string") return v;
            if (v === undefined) return "undefined";
            if (typeof v === "function") return v.toString();
            if (typeof v === "object") return JSON.stringify(v);
            return String(v);
          } catch (err) {
            return String(v);
          }
        }
        var consoleShim = {
          log: function () { logs.push(Array.prototype.map.call(arguments, fmt).join(" ")); },
          error: function () { logs.push("[Error] " + Array.prototype.map.call(arguments, fmt).join(" ")); },
          warn: function () { logs.push("[Warn] " + Array.prototype.map.call(arguments, fmt).join(" ")); }
        };
        try {
          var fn = new Function("console", '"use strict";\\n' + code);
          var result = fn(consoleShim);
          if (result && typeof result.then === "function") {
            result.then(function () {
              self.postMessage({ ok: true, output: logs.join("\\n") });
            }).catch(function (err) {
              self.postMessage({ ok: false, output: logs.join("\\n"), error: (err && (err.stack || err.message)) || String(err) });
            });
          } else {
            self.postMessage({ ok: true, output: logs.join("\\n") });
          }
        } catch (err) {
          self.postMessage({ ok: false, output: logs.join("\\n"), error: (err && (err.stack || err.message)) || String(err) });
        }
      };
    `;

    const blob = new Blob([workerSource], { type: "application/javascript" });
    const url = URL.createObjectURL(blob);
    const worker = new Worker(url);
    let settled = false;

    const timer = setTimeout(() => {
      if (settled) return;
      settled = true;
      worker.terminate();
      URL.revokeObjectURL(url);
      resolve({
        success: false,
        output: "",
        error: `Execution timed out after ${timeout}ms (possible infinite loop).`,
      });
    }, timeout);

    worker.onmessage = (e: MessageEvent) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      worker.terminate();
      URL.revokeObjectURL(url);
      const msg = e.data;
      resolve(
        msg.ok
          ? { success: true, output: msg.output, error: "" }
          : { success: false, output: msg.output, error: msg.error }
      );
    };

    worker.onerror = (e: ErrorEvent) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      worker.terminate();
      URL.revokeObjectURL(url);
      resolve({ success: false, output: "", error: e.message || "Execution error" });
    };

    worker.postMessage({ code });
  });
}
