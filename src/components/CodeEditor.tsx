import { useState, useCallback } from "react";
import Editor from "@monaco-editor/react";
import { Play, Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { runJavaScript } from "../lib/sandbox";

interface CodeEditorProps {
  starterCode?: string;
  readOnly?: boolean;
  onCodeChange?: (code: string) => void;
  height?: string;
}

export default function CodeEditor({
  starterCode = "",
  readOnly = false,
  onCodeChange,
  height = "400px",
}: CodeEditorProps) {
  const [code, setCode] = useState(starterCode);
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [running, setRunning] = useState(false);

  const handleEditorChange = useCallback(
    (value: string | undefined) => {
      const newCode = value ?? "";
      setCode(newCode);
      onCodeChange?.(newCode);
    },
    [onCodeChange]
  );

  const handleRun = async () => {
    setRunning(true);
    setOutput("");
    setError("");

    try {
      const result = await runJavaScript(code, 5000);
      if (result.success) {
        setOutput(result.output);
      } else {
        setError(result.error || "Unknown error");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to execute code");
    } finally {
      setRunning(false);
    }
  };

  return (
    <div className="rounded-xl overflow-hidden border border-cs-700">
      <div className="flex items-center justify-between px-4 py-2 bg-cs-800 border-b border-cs-700">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-danger/80" />
            <div className="w-3 h-3 rounded-full bg-warning/80" />
            <div className="w-3 h-3 rounded-full bg-success/80" />
          </div>
          <span className="text-xs text-cs-400 font-mono">script.js</span>
        </div>
        {!readOnly && (
          <Button
            variant="primary"
            size="sm"
            onClick={handleRun}
            disabled={running}
          >
            {running ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Play className="w-4 h-4" />
            )}
            Run
          </Button>
        )}
      </div>

      <Editor
        height={height}
        defaultLanguage="javascript"
        theme="vs-dark"
        value={code}
        onChange={handleEditorChange}
        options={{
          readOnly,
          minimap: { enabled: false },
          fontSize: 14,
          lineNumbers: "on",
          scrollBeyondLastLine: false,
          padding: { top: 12 },
          fontFamily: "'JetBrains Mono', ui-monospace, monospace",
          tabSize: 2,
          automaticLayout: true,
          bracketPairColorization: { enabled: true },
          renderLineHighlight: "line",
          cursorBlinking: "smooth",
          smoothScrolling: true,
        }}
      />

      {(output || error) && (
        <div className="border-t border-cs-700">
          <div className="px-4 py-2 bg-cs-800/50 border-b border-cs-700">
            <span className="text-xs font-medium text-cs-400">Output</span>
          </div>
          <div className="p-4 bg-cs-900 font-mono text-sm min-h-[60px] max-h-[200px] overflow-auto">
            {output && (
              <pre className="text-cs-200 whitespace-pre-wrap">{output}</pre>
            )}
            {error && (
              <pre className="text-danger whitespace-pre-wrap">{error}</pre>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
