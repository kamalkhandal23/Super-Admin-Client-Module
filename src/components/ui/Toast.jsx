import { CheckCircle2, XCircle, Info, X } from "lucide-react";

const variants = {
  success: {
    icon: CheckCircle2,
    container: "border-emerald-200 bg-emerald-50 text-emerald-900",
    iconClass: "text-emerald-600",
  },
  error: {
    icon: XCircle,
    container: "border-red-200 bg-red-50 text-red-900",
    iconClass: "text-red-600",
  },
  info: {
    icon: Info,
    container: "border-sky-200 bg-sky-50 text-sky-900",
    iconClass: "text-sky-600",
  },
};

export default function Toast({ open, message, type = "success", onClose }) {
  if (!open) return null;

  const current = variants[type] || variants.info;
  const Icon = current.icon;

  return (
    <div className="fixed right-5 top-5 z-[10050]">
      <div
        role="status"
        aria-live="polite"
        className={`flex min-w-[280px] max-w-[360px] items-start gap-3 rounded-xl border px-4 py-3 shadow-lg ${current.container}`}
      >
        <Icon className={`mt-0.5 h-5 w-5 shrink-0 ${current.iconClass}`} />
        <p className="flex-1 text-sm font-medium leading-5">{message}</p>
        <button
          type="button"
          onClick={onClose}
          className="rounded-full p-1 transition hover:bg-black/5"
          aria-label="Close toast"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
