export default function Drawer({ open, onClose, title, children }) {
  if (!open) return null;

  return (
    <div className="absolute inset-0 z-20 flex justify-end">

      <div
        className="absolute inset-0 bg-black/30"
        onClick={onClose}
      />

      <div className="relative w-[420px] h-full bg-white shadow-xl flex flex-col">

        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="font-semibold">{title}</h3>
          <button onClick={onClose}>✕</button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {children}
        </div>
      </div>
    </div>
  );
}
