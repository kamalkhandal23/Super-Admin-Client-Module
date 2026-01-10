import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

export default function ClientsFooter({
  page,
  pageSize,
  total,
  canPrev,
  canNext,
  onPrev,
  onNext,
  onPageSizeChange,
}) {
  const start = (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, total);

  return (
    <div className="flex items-center justify-between px-4 py-3 border-t bg-white text-sm">

      <div className="flex items-center gap-2">
        <span className="text-gray-600">Results per page:</span>
        <select
          value={pageSize}
          onChange={(e) => onPageSizeChange(Number(e.target.value))}
          className="border rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          {[10, 15, 20, 30].map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
      </div>


      <div className="flex items-center gap-3 text-gray-600">

        <span>
          {start}-{end} of {total}
        </span>

        <div className="flex items-center gap-1">
          <button
            disabled={!canPrev}
            onClick={() => onPrev()}
            className={`p-1 rounded ${
              canPrev
                ? "hover:bg-gray-100 text-gray-700"
                : "opacity-40 cursor-not-allowed"
            }`}
          >
            <ChevronsLeft size={16} />
          </button>

          <button
            disabled={!canPrev}
            onClick={onPrev}
            className={`p-1 rounded ${
              canPrev
                ? "hover:bg-gray-100 text-gray-700"
                : "opacity-40 cursor-not-allowed"
            }`}
          >
            <ChevronLeft size={16} />
          </button>

          <button
            disabled={!canNext}
            onClick={onNext}
            className={`p-1 rounded ${
              canNext
                ? "hover:bg-gray-100 text-gray-700"
                : "opacity-40 cursor-not-allowed"
            }`}
          >
            <ChevronRight size={16} />
          </button>

          <button
            disabled={!canNext}
            onClick={onNext}
            className={`p-1 rounded ${
              canNext
                ? "hover:bg-gray-100 text-gray-700"
                : "opacity-40 cursor-not-allowed"
            }`}
          >
            <ChevronsRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
