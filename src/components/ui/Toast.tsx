import React from "react";
import { X, CheckCircle, AlertCircle, Info } from "lucide-react";
import { useStore } from "../../store/useStore";

export const Toast: React.FC = () => {
  const { toasts, removeToast } = useStore();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`w-full p-4 rounded-lg shadow-lg border transition-all duration-300 animate-in slide-in-from-right-2 ${
            toast.type === "success"
              ? "bg-green-50 border-green-200 text-green-800"
              : toast.type === "error"
              ? "bg-red-50 border-red-200 text-red-800"
              : "bg-blue-50 border-blue-200 text-blue-800"
          }`}
        >
          <div className="flex items-start">
            <div className="flex-shrink-0">
              {toast.type === "success" && (
                <CheckCircle className="h-5 w-5 text-green-400" />
              )}
              {toast.type === "error" && (
                <AlertCircle className="h-5 w-5 text-red-400" />
              )}
              {toast.type === "info" && (
                <Info className="h-5 w-5 text-blue-400" />
              )}
            </div>
            <div className="ml-3 flex-1">
              <p className="text-sm font-medium">{toast.message}</p>
            </div>
            <div className="ml-4 flex-shrink-0">
              <button
                onClick={() => removeToast(toast.id)}
                className={`inline-flex rounded-md p-1.5 focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors ${
                  toast.type === "success"
                    ? "text-green-500 hover:bg-green-100 focus:ring-green-600"
                    : toast.type === "error"
                    ? "text-red-500 hover:bg-red-100 focus:ring-red-600"
                    : "text-blue-500 hover:bg-blue-100 focus:ring-blue-600"
                }`}
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
