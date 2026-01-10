export default function Modal({ open, onClose, title, children }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">

      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative w-[900px] max-h-[90vh] bg-white rounded-lg shadow-xl overflow-hidden">

        <div className="flex justify-between items-center px-6 py-4 border-b">
          <h2 className="font-semibold text-lg">{title}</h2>
          <button
            onClick={onClose}
            className="text-xl text-gray-500 hover:text-black"
          >
            ✕
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[80vh]">
          {children}
        </div>
      </div>
    </div>
  );
}
