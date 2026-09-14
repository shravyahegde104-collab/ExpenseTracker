import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";
import { CheckCircleIcon, XIcon, AlertTriangleIcon } from "./icons";

type ToastVariant = "success" | "error";

interface ToastMessage {
  id: number;
  variant: ToastVariant;
  text: string;
}

interface ToastContextValue {
  showSuccess: (text: string) => void;
  showError: (text: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

let nextToastId = 0;

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const dismiss = useCallback((id: number) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  const push = useCallback(
    (variant: ToastVariant, text: string) => {
      const id = nextToastId++;
      setToasts((current) => [...current, { id, variant, text }]);
      window.setTimeout(() => dismiss(id), 4000);
    },
    [dismiss]
  );

  const showSuccess = useCallback((text: string) => push("success", text), [push]);
  const showError = useCallback((text: string) => push("error", text), [push]);

  return (
    <ToastContext.Provider value={{ showSuccess, showError }}>
      {children}
      <div
        aria-live="polite"
        className="fixed bottom-4 left-4 right-4 z-50 flex flex-col gap-2 sm:left-auto sm:w-full sm:max-w-sm"
      >
        {toasts.map((toast) => (
          <div
            key={toast.id}
            role="status"
            className={`flex animate-toast-in items-start gap-2.5 rounded-xl border bg-paper-raised px-4 py-3.5 text-sm font-medium shadow-popover ${
              toast.variant === "success"
                ? "border-success-100 text-success-700"
                : "border-danger-100 text-danger-700"
            }`}
          >
            <span
              className={toast.variant === "success" ? "text-success-500" : "text-danger-500"}
              aria-hidden="true"
            >
              {toast.variant === "success" ? (
                <CheckCircleIcon width={18} height={18} />
              ) : (
                <AlertTriangleIcon width={18} height={18} />
              )}
            </span>
            <span className="flex-1 pt-0.5 text-ink">{toast.text}</span>
            <button
              type="button"
              onClick={() => dismiss(toast.id)}
              aria-label="Dismiss notification"
              className="mt-0.5 text-ink-faint transition-colors hover:text-ink"
            >
              <XIcon width={15} height={15} />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return ctx;
}
