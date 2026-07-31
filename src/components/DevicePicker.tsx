import { DEVICES } from "../lib/curriculum";
import type { DeviceId } from "../lib/types";
import { Laptop, Monitor, Smartphone, PcCase, Loader2, Check, Radar } from "lucide-react";

const DEVICE_ICONS = {
  laptop: Laptop,
  monitor: Monitor,
  smartphone: Smartphone,
  pc: PcCase,
} as const;

interface DevicePickerProps {
  device: DeviceId | null;
  /** Device detected from the browser — shown pre-highlighted until the user confirms */
  detected?: DeviceId | null;
  onSelect: (device: DeviceId) => void;
  saving?: boolean;
  compact?: boolean;
  className?: string;
}

export default function DevicePicker({
  device,
  detected,
  onSelect,
  saving,
  compact,
  className,
}: DevicePickerProps) {
  return (
    <div
      className={`grid gap-4 ${
        compact ? "grid-cols-2 sm:grid-cols-4" : "sm:grid-cols-2 lg:grid-cols-4 grid-cols-1"
      } ${className ?? ""}`}
    >
      {DEVICES.map((d) => {
        const Icon = DEVICE_ICONS[d.icon];
        const selected = device === d.id;
        const isDetected = !selected && detected === d.id;
        return (
          <button
            key={d.id}
            type="button"
            onClick={() => onSelect(d.id)}
            disabled={saving}
            className={`group relative text-left rounded-2xl border p-4 sm:p-5 transition-all duration-200 cursor-pointer disabled:opacity-60 ${
              compact ? "p-4" : ""
            } ${
              selected
                ? "border-accent bg-accent-muted/40 ring-1 ring-accent shadow-lg shadow-accent-muted"
                : isDetected
                  ? "border-cs-500 bg-cs-800/80 ring-1 ring-cs-500/40 hover:border-accent"
                  : "border-cs-700 bg-cs-800/60 hover:border-cs-500 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-cs-900"
            }`}
          >
            {selected ? (
              <span className="absolute top-3 right-3 w-6 h-6 rounded-full bg-accent text-white flex items-center justify-center">
                <Check className="w-3.5 h-3.5" strokeWidth={3} />
              </span>
            ) : isDetected ? (
              <span className="absolute top-3 right-3 inline-flex items-center gap-1 text-[9px] font-semibold uppercase tracking-wide rounded-full bg-cs-700 text-cs-300 px-2 py-0.5">
                <Radar className="w-3 h-3 text-accent" />
                Detected
              </span>
            ) : null}
            <div
              className={`w-11 h-11 rounded-xl flex items-center justify-center mb-3 transition-colors ${
                compact ? "w-10 h-10" : ""
              }`}
              style={{ backgroundColor: `${d.color}1f` }}
            >
              <Icon
                className={compact ? "w-5 h-5" : "w-6 h-6"}
                style={{ color: d.color }}
              />
            </div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-semibold text-cs-100 group-hover:text-accent transition-colors">
                {d.name}
              </span>
              <span className="text-[10px] text-cs-500 uppercase tracking-wide">
                {d.tagline}
              </span>
            </div>
            {!compact && (
              <p className="text-xs text-cs-400 leading-relaxed">{d.description}</p>
            )}
          </button>
        );
      })}
      {saving && (
        <div className="col-span-full flex items-center justify-center gap-2 text-xs text-cs-400">
          <Loader2 className="w-3.5 h-3.5 animate-spin text-accent" />
          Saving your device…
        </div>
      )}
    </div>
  );
}
