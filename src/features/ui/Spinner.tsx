// Interface for the props that the Spinner component accepts with default values for size and optional text.
interface SpinnerProps {
  size?: number;
  text?: string;
}

// A simple spinner component that can be used to indicate loading states.
export default function Spinner({ size = 40, text }: SpinnerProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      {/* Spinner */}
      <div
        className="animate-spin rounded-full border-4 border-neutral-700 border-t-[#E4100F]"
        style={{
          width: size,
          height: size,
        }}
      />

      {/* Optional text */}
      {text && <p className="text-2xl text-slate-300">{text}</p>}
    </div>
  );
}
