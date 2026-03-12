// Props definition for the ErrorBox component that accepts a message string which can be null that displays
interface Props {
  message: string | null;
}

// Component used to show error messages in the UI
export default function ErrorBox({ message }: Props) {
  // If there is no error message, render nothing
  if (!message) return null;

  return (
    // Styled container for displaying error feedback
    <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
      {message}
    </div>
  );
}
