// Import type for standard button HTML attributes
import type { ButtonHTMLAttributes } from "react";

// Define allowed button style variants
type ButtonVariant = "primary" | "secondary" | "danger" | "ghost";

// Props definition extending standard button attributes

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant; // Optional variant prop to select button style, defaults to "primary"
}

// Reusable button component used across the application
export default function Button({
  variant = "primary",
  className = "",
  children,
  ...props
}: Props) {
  // Base styles applied to all buttons
  const base =
    "inline-flex items-center justify-center h-12 px-6 rounded-full font-medium text-sm transition-all";

  // Style variations depending on the variant prop
  const styles = {
    primary: "bg-[#E4100F] text-white hover:opacity-90",

    secondary: "bg-white text-black hover:bg-slate-200",

    danger: "bg-red-600 text-white hover:bg-red-700",

    ghost: "bg-transparent text-white hover:bg-white/10",
  };

  return (
    <button {...props} className={`${base} ${styles[variant]} ${className}`}>
      {children}
    </button>
  );
}
