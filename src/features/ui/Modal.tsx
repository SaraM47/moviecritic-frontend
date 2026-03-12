// Import ReactNode type to allow any React content to be passed into the modal and close icon from lucide-react
import type { ReactNode } from "react";
import { X } from "lucide-react";

// Props definition for the Modal component
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

// Reusable modal component used across the application
export default function Modal({ isOpen, onClose, children }: ModalProps) {
  // If the modal is not open, render nothing

  if (!isOpen) return null;

  return (
    // Fullscreen overlay container centered both vertically and horizontally
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* Background overlay that darkens the page and closes modal when clicked */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-lg md:max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-neutral-900 p-6 md:p-8 text-white shadow-2xl">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-slate-400 hover:text-white"
        >
          <X size={26} />
        </button>
        {/* Modal content passed as children */}
        {children}
      </div>
    </div>
  );
}
