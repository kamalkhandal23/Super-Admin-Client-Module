import { Bell, ChevronDown } from "lucide-react";

export default function Topbar({ title = "Clients", onAddClient }) {
  return (
    <div className="h-14 bg-white border-b flex items-center justify-between px-4">

      <h1 className="text-lg font-semibold text-gray-800">
        {title}
      </h1>

      <div className="flex items-center gap-4">

        <button className="relative">
          <Bell size={18} className="text-gray-600" />
          <span className="absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full"></span>
        </button>

        <div className="flex items-center gap-2 cursor-pointer">
          <div className="h-8 w-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-medium">
            DU
          </div>

          <span className="text-sm font-medium text-gray-700">
            Demo User
          </span>

          <ChevronDown size={16} className="text-gray-500" />
        </div>

      </div>
    </div>
  );
}
