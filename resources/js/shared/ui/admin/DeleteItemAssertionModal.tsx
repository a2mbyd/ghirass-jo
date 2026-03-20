import { CircleAlert } from "lucide-react";

interface DeleteItemAssertionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  description?: string;
}

export default function DeleteItemAssertionModal({
  isOpen,
  onClose,
  onConfirm,
  title = "Are you absolutely sure?",
  description = "This action is irreversible. Once confirmed, the item will be permanently removed.",
}: DeleteItemAssertionModalProps) {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 delete-modal-overlay ${
        isOpen ? "opacity-100" : "opacity-0"
      }`}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className={`delete-modal-card relative w-full max-w-md rounded-2xl border p-6 transition-all duration-300 ${
          isOpen ? "translate-y-0 scale-100 opacity-100" : "translate-y-4 scale-95 opacity-0"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="delete-modal-icon mb-4 flex h-12 w-12 items-center justify-center rounded-xl border">
          <CircleAlert className="h-6 w-6 text-danger" />
        </div>

        <h2 id="modal-title" className="delete-modal-title mb-2 font-display text-xl font-bold">
          {title}
        </h2>
        <p className="delete-modal-description mb-6 text-sm leading-relaxed">
          {description}
        </p>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="delete-modal-cancel flex-1 rounded-xl border px-4 py-2.5 text-sm font-medium transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="delete-modal-confirm flex-1 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
