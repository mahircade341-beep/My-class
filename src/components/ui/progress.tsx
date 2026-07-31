import { cn } from "../../lib/utils";

interface ProgressProps {
  value: number;
  max?: number;
  className?: string;
  barClassName?: string;
  size?: "sm" | "md";
  showLabel?: boolean;
}

export function Progress({
  value,
  max = 100,
  className,
  barClassName,
  size = "md",
  showLabel = false,
}: ProgressProps) {
  const percentage = Math.min(Math.round((value / max) * 100), 100);

  const heights = {
    sm: "h-1.5",
    md: "h-2.5",
  };

  return (
    <div className="flex items-center gap-3">
      <div
        className={cn(
          "flex-1 bg-cs-700 rounded-full overflow-hidden",
          heights[size],
          className
        )}
      >
        <div
          className={cn(
            "h-full bg-gradient-to-r from-accent to-accent-hover rounded-full transition-all duration-500 ease-out",
            heights[size],
            barClassName
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
      {showLabel && (
        <span className="text-xs text-cs-400 font-mono min-w-[3ch] text-right">
          {percentage}%
        </span>
      )}
    </div>
  );
}
