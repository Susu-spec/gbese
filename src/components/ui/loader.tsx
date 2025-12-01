import { cn } from "@/lib/utils";

interface LoaderProps {
  size?: "sm" | "md" | "lg";
  ariaLabel?: string;
  className?: string;
}

const sizeMap: Record<string, string> = {
  sm: "h-4 w-4 border-2",
  md: "h-8 w-8 border-4",
  lg: "h-12 w-12 border-4",
};

export function Loader({ size = "md", ariaLabel = "Loading", className }: LoaderProps) {
  return (
    <div
      role="status"
      aria-label={ariaLabel}
      className={cn(
        "animate-spin rounded-full border-primary-200 border-t-primary-700",
        sizeMap[size],
        className
      )}
    >
      <span className="sr-only">{ariaLabel}</span>
    </div>
  );
}

export default Loader;
