// Extend standard HTML input attributes so the component behaves like a normal input
interface Props extends React.InputHTMLAttributes<HTMLInputElement> {}

// Reusable styled input component
export default function Input({ className = "", ...props }: Props) {
  return (
    <input
      {...props} // Spread all native input props (type, value, onChange, etc.)
      className={`
        h-14 w-full rounded-full bg-white px-6 text-black text-lg outline-none
        placeholder:text-slate-400
        ${className}
      `}
    />
  );
}