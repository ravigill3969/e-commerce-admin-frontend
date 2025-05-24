import { useToast } from "@/context/toast";
import { useEffect, useState } from "react";

export const ToastContainer = () => {
  const { toasts, removeToast } = useToast();
  const [visibleToasts, setVisibleToasts] = useState(toasts);

  useEffect(() => {
    setVisibleToasts(toasts);
  }, [toasts]);

  return (
    <div className="fixed top-4 right-4 space-y-2 z-50">
      {visibleToasts.map((toast) => (
        <Toast key={toast.id} toast={toast} onRemove={() => removeToast(toast.id)} />
      ))}
    </div>
  );
};

const Toast = ({
  toast,
  onRemove,
}: {
  toast: { id: number; message: string; type?: "success" | "error" | "info" };
  onRemove: () => void;
}) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);

    // Auto remove toast after 3 seconds with fade-out effect
    const timer = setTimeout(() => setShow(false), 3000);

    // Remove from context after fade-out duration (300ms)
    const removeTimer = setTimeout(() => onRemove(), 3300);

    return () => {
      clearTimeout(timer);
      clearTimeout(removeTimer);
    };
  }, [onRemove]);

  return (
    <div
      className={`px-4 py-2 rounded shadow-lg text-white transform transition-all duration-300 ease-in-out
        ${toast.type === "success" ? "bg-green-500" : toast.type === "error" ? "bg-red-500" : "bg-blue-500"}`}
      style={{
        opacity: show ? 1 : 0,
        transform: show ? "translateY(0)" : "translateY(-20px)",
      }}
    >
      {toast.message}
    </div>
  );
};
