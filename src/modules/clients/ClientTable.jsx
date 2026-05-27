import {
  Search,
  Plus,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import viewIcon from "../../assets/view-icon.svg";
import editIcon from "../../assets/edit-icon.svg";

const skeletonRows = Array.from({ length: 7 }, (_, index) => index);

export default function ClientsTable({
  data,
  loading,
  page,
  pageSize,
  total,
  searchText,
  statusFilter,
  onSearchChange,
  onStatusChange,
  onAddClient,
  onPrev,
  onNext,
  onPageSizeChange,
  canPrev,
  canNext,
  onEdit,
  onView,
}) {
  return (
    <div className="bg-white border border-[#d9e2ec] rounded-xl shadow-md flex flex-col overflow-hidden">

      <div className="flex items-center justify-between px-6 py-4 bg-[#e8f0f2] border-b border-[#d9e2ec]">
        <h2 className="text-[#0f766e] font-semibold text-base">Client List</h2>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-2.5 text-gray-400 focus-within:border-[#1b6983e6]  focus-within:ring-1 focus-within:ring-[#1b6983e6]/30" />
            <input
              value={searchText}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search Clients..."
              className="pl-9 pr-3 py-2 border focus:outline-none focus:ring-0 border-gray-300 hover:border-[#1b6983e6] rounded-md text-sm bg-white"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => onStatusChange(e.target.value)}
            className="border border-gray-300 px-3 py-2 rounded-md text-sm bg-white pr-8"
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>

          <button
            onClick={onAddClient}
            className="flex items-center gap-1 bg-[#1b6983] text-white px-4 py-2 rounded-md text-sm hover:bg-[#17324b]"
          >
            <Plus size={14} /> Add Client
          </button>
        </div>
      </div>

      {/* TABLE HEADER */}
      <div className="px-8 pt-4 pb-2">
        <div className="grid grid-cols-[80px_1.6fr_1.6fr_1.2fr_1fr_120px] items-center text-[11px] font-semibold tracking-wide text-gray-500 uppercase px-4">


          <div>SL NO</div>
          <div>PARTNER NAME</div>
          <div>DOMAIN</div>
          <div>COOLING OFF PERIOD</div>
          <div>ACTIVE</div>
          <div className="text-right">ACTIONS</div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 pb-3 space-y-1 max-h-[500px]">
        {loading ? (
          skeletonRows.map((row) => (
            <div
              key={row}
              className="grid grid-cols-[80px_1.6fr_1.6fr_1.2fr_1fr_120px] items-center bg-[#f8fafc] px-5 py-2.5 rounded-xl border border-[#e2e8f0]"
            >
              <div className="h-3 w-5 rounded bg-slate-200 animate-pulse" />
              <div className="h-3 w-28 rounded bg-slate-200 animate-pulse" />
              <div className="h-3 w-36 rounded bg-slate-200 animate-pulse" />
              <div className="h-6 w-20 rounded-md bg-slate-200 animate-pulse" />
              <div className="h-6 w-20 rounded-full bg-slate-200 animate-pulse" />
              <div className="flex justify-end gap-3">
                <div className="h-4 w-4 rounded bg-slate-200 animate-pulse" />
                <div className="h-4 w-4 rounded bg-slate-200 animate-pulse" />
              </div>
            </div>
          ))
        ) : (
          data.map((row, i) => (
            <div
              key={row.id}
              className="grid grid-cols-[80px_1.6fr_1.6fr_1.2fr_1fr_120px] items-center bg-[#f8fafc] hover:bg-[#f1f5f9] px-5 py-2.5 rounded-xl border border-[#e2e8f0] transition-all duration-200"
            >
              <div className="text-xs text-grey-700 font-normal">{(page - 1) * pageSize + i + 1}</div>

              <div className="text-xs text-grey-700">{row.name}</div>
              <div className="text-xs text-grey-700">{row.domain}</div>


              <div>
                <span className="inline-flex rounded-md bg-[#e9eff5] px-3 py-1 text-[11px] font-medium text-[#51697f]">



                  {row.cool} days
                </span>
              </div>

              <div>
                <span
                  className={`inline-flex items-center justify center rounded-full px-3 py-1 text-xs font-semibold ${row.active
                    ? "bg-[#e6f4ea] text-[#2e7d32]"
                    : "bg-[#fdecea] text-[#c62828]"
                    }`}
                >
                  {row.active ? "Active" : "Inactive"}
                </span>
              </div>

              <div className="flex items-center justify-end gap-3 text-[#6b7c8f]">
                <button
                  type="button"
                  onClick={() => onEdit(row)}
                  className="group relative inline-flex h-6 w-6 items-center justify-center rounded-md hover:bg-slate-200/70"
                  aria-label="Edit client"
                >
                  <img
                    src={editIcon}
                    alt=""
                    className="h-4 w-4 object-contain opacity-80 transition group-hover:opacity-100"
                  />
                  <span className="pointer-events-none absolute left-1/2 top-8 z-20 -translate-x-1/2 rounded bg-slate-800 px-2 py-1 text-[10px] font-medium text-white opacity-0 shadow transition group-hover:opacity-100">
                    Edit
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => onView(row)}
                  className="group relative inline-flex h-6 w-6 items-center justify-center rounded-md hover:bg-slate-200/70"
                  aria-label="View client"
                >
                  <img
                    src={viewIcon}
                    alt=""
                    className="h-4 w-4 object-contain opacity-80 transition group-hover:opacity-100"
                  />
                  <span className="pointer-events-none absolute left-1/2 top-8 z-20 -translate-x-1/2 rounded bg-slate-800 px-2 py-1 text-[10px] font-medium text-white opacity-0 shadow transition group-hover:opacity-100">
                    View
                  </span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* FOOTER */}
      <div className="flex items-center justify-between px-6 py-4 border-t border-[#e2e8f0] bg-white">
        <div className="flex items-center gap-2 text-xs text-[#5b6b7c]">
          Results per page:
          <select
            value={pageSize}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
            className="border border-[#cfdbe6] rounded px-2 py-1 text-xs bg-white"
          >
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={25}>25</option>
          </select>
        </div>

        <div className="flex items-center gap-4 text-xs text-[#5b6b7c]">
          <span>
            {(page - 1) * pageSize + 1}–{Math.min(page * pageSize, total)} of {total}
          </span>
          <div className="flex items-center gap-2 text-[#6b7c8f]">
            <button
              type="button"
              disabled={!canPrev}
              onClick={onPrev}
              className="inline-flex h-6 w-6 items-center justify-center rounded-md border border-[#cfdbe6] bg-white transition hover:bg-[#f1f5f9] disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Previous page"
            >
              <ChevronLeft size={15} />
            </button>
            <button
              type="button"
              disabled={!canNext}
              onClick={onNext}
              className="inline-flex h-6 w-6 items-center justify-center rounded-md border border-[#cfdbe6] bg-white transition hover:bg-[#f1f5f9] disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Next page"
            >
              <ChevronRight size={15} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
