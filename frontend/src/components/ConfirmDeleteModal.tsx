import { useEffect } from "react";
import { AlertTriangleIcon, TrashIcon } from "./icons";

interface ConfirmDeleteModalProps {
  open: boolean;
  title: string;
  description?: string;
  confirmLabel?: string;
  isLoading?: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

export default function ConfirmDeleteModal({
  open,
  title,
  description,
  confirmLabel = "Delete expense",
  isLoading,
  onCancel,
  onConfirm,
}: ConfirmDeleteModalProps) {
  useEffect(() => {
    if (!open) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onCancel();
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onCancel]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-delete-title"
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
    >
      <div
        className="absolute inset-0 animate-fade-in bg-ink/50 backdrop-blur-[2px]"
        onClick={onCancel}
        aria-hidden="true"
      />
      <div className="relative w-full max-w-sm animate-scale-in rounded-xl border border-line bg-paper-raised p-6 shadow-popover">
        <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-danger-100 text-danger-500">
          <AlertTriangleIcon width={22} height={22} />
        </div>
        <h3
          id="confirm-delete-title"
          className="mb-1.5 font-display text-lg font-semibold text-ink"
        >
          {title}
        </h3>
        {description && (
          <p className="mb-6 text-sm leading-relaxed text-ink-soft">
            {description}
          </p>
        )}
        <div className="flex justify-end gap-2.5">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg border border-line px-4 py-2 text-sm font-medium text-ink-soft transition-colors hover:border-line-strong hover:bg-paper-sunken hover:text-ink"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isLoading}
            className="inline-flex items-center gap-1.5 rounded-lg bg-danger-500 px-4 py-2 text-sm font-medium text-paper-raised shadow-card transition-colors hover:bg-danger-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <TrashIcon width={15} height={15} />
            {isLoading ? "Deleting…" : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
