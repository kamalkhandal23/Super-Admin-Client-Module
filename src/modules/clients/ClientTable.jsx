import { Search, Plus, Pencil, Eye } from "lucide-react";

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
        <h2 className="text-[#2f855a] font-semibold text-base">Client List</h2>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-2.5 text-gray-400" />
            <input
              value={searchText}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search Clients..."
              className="pl-9 pr-3 py-2 border border-[#cfdbe6] rounded-md text-sm bg-white"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => onStatusChange(e.target.value)}
            className="border border-[#cfdbe6] px-3 py-2 rounded-md text-sm bg-white"
          >
            <option value="">Filter by status</option>
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
      <div className="px-8 pt-6 pb-3">
        <div className="grid grid-cols-[80px_1.6fr_1.6fr_1.2fr_1fr_120px] items-center text-[11px] font-semibold tracking-wide text-[#7b8a9a] uppercase px-4">


          <div>SL NO</div>
          <div>PARTNER NAME</div>
          <div>DOMAIN</div>
          <div>COOLING OFF PERIOD</div>
          <div>ACTIVE</div>
          <div className="text-right">ACTIONS</div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 pb-4 space-y-3 max-h-[500px]">
        {loading ? (
          <div className="p-6 text-center text-gray-500">Loading clients...</div>
        ) : (
          data.map((row, i) => (
            <div
              key={row.id}
              className="grid grid-cols-[80px_1.6fr_1.6fr_1.2fr_1fr_120px] items-center bg-[#f8fafc] hover:bg-[#f1f5f9] px-5 py-4 rounded-xl border border-[#e2e8f0] transition-all duration-200"
            >
              <div className="text-[#334e68] font-normal">{(page - 1) * pageSize + i + 1}</div>

              <div className="text-[#243b53]">{row.name}</div>
              <div className="text-[#486581]">{row.domain}</div>


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
                <Pencil className="h-4 w-4 cursor-pointer hover:text-[#1f3b57]" onClick={() => onEdit(row)} />
                <Eye className="h-4 w-4 cursor-pointer hover:text-[#1f3b57]" onClick={() => onView(row)} />
              </div>
            </div>
          ))
        )}
      </div>

      {/* FOOTER */}
      <div className="flex items-center justify-between px-6 py-4 border-t border-[#e2e8f0] bg-white">
        <div className="flex items-center gap-2 text-sm text-[#5b6b7c]">
          Results per page:
          <select
            value={pageSize}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
            className="border border-[#cfdbe6] rounded px-2 py-1 text-sm bg-white"
          >
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={25}>25</option>
          </select>
        </div>

        <div className="flex items-center gap-4 text-sm text-[#5b6b7c]">
          <span>
            {(page - 1) * pageSize + 1}–{Math.min(page * pageSize, total)} of {total}
          </span>
          <div className="flex items-center gap-2 text-[#6b7c8f]">
            <button disabled={!canPrev} onClick={onPrev}>‹</button>
            <button disabled={!canNext} onClick={onNext}>›</button>
          </div>
        </div>
      </div>
    </div>
  );
}
