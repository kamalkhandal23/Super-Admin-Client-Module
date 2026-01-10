import { useState } from "react";
import { LayoutDashboard, Users, ChevronLeft } from "lucide-react";
import SidebarItem from "./SidebarItem";

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div
      className={`h-screen bg-white border-r transition-all duration-300
      ${collapsed ? "w-16" : "w-64"}`}
    >

      <div className="h-14 flex items-center justify-between px-3 border-b border-slate-200">
        {!collapsed && (
          <span className="font-bold text-lg text-blue-600">
            QuipHire
          </span>
        )}

        <button
          onClick={() => setCollapsed((c) => !c)}
          className="p-1 rounded hover:bg-slate-100 transition"
        >
          <ChevronLeft
            size={18}
            className={`transition ${collapsed ? "rotate-180" : ""}`}
          />
        </button>
      </div>

      <div className="p-2 space-y-1">
        <SidebarItem
          icon={<LayoutDashboard size={18} />}
          label="Dashboard"
          collapsed={collapsed}
          childrenItems={[
            { label: "Overview", path: "/" },
            { label: "Analytics", path: "/analytics" },
          ]}
        />

        <SidebarItem
          icon={<Users size={18} />}
          label="Clients"
          collapsed={collapsed}
          childrenItems={[
            { label: "Add/Edit Client", path: "/clients" },
          ]}
        />
      </div>
    </div>
  );
}
