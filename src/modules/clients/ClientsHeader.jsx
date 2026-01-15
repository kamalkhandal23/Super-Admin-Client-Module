import { Search, Plus } from "lucide-react";

export default function ClientsHeader({ onAddClient }) {
  return (
    <div className="flex items-center justify-between bg-white border border-brand-dark/20 rounded-xl p-4 shadow-sm">

      
      <h2 className="text-brand-dark font-semibold text-base">
        Client List
      </h2>

      <div className="flex items-center gap-3">
        
        <div className="relative">
          <Search size={16} className="absolute left-2 top-2.5 text-gray-400" />
          <input
            placeholder="Search Clients..."
            className="pl-8 pr-3 py-2 border rounded text-sm"
          />
        </div>

        <select className="border px-3 py-2 rounded text-sm">
          <option>Filter by status</option>
          <option>Active</option>
          <option>Inactive</option>
        </select>

        <button
          onClick={onAddClient}
          className="flex items-center gap-1 bg-brand-dark text-white hover:bg-brand-dark/90 px-3 py-2 rounded text-sm"
        >
          <Plus size={14} /> Add Client
        </button>
      </div>
    </div>
  );
}
