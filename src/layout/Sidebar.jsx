import { useState } from "react";
import {
  LayoutDashboard,
  Users,
  PlusCircle,
  BarChart3,
  ChevronLeft,
} from "lucide-react";
import SidebarItem from "./SidebarItem";

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div
      className={`h-screen bg-brand-bg border-r border-brand-dark/20 transition-all duration-300
  ${collapsed ? "w-16" : "w-64"}`}
    >

      {/* Logo */}
      <div className="h-14 flex items-center justify-between px-3 border-b">
        {!collapsed && (
          <span className="font-bold text-lg text-brand-dark">QuipHire</span>
        )}

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1 rounded hover:bg-brand-dark/10"
        >

          <ChevronLeft
            size={18} 
            className={`transition ${collapsed ? "rotate-180" : ""}`}
          />
        </button>
      </div>

      {/* MENU */}
      <div className="p-2 space-y-1">
        <SidebarItem
          icon={<LayoutDashboard size={18} />}
          label="Dashboard"
          collapsed={collapsed}
          childrenItems={[
            {
              label: "Overview",
              icon: <LayoutDashboard size={14} />,
              path: "/",
            },
            {
              label: "Analytics",
              icon: <BarChart3 size={14} />,
              path: "/analytics",
            },
          ]}
        />

        <SidebarItem
          icon={<Users size={18} />}
          label="Clients"
          collapsed={collapsed}
          childrenItems={[
            {
              label: "Add / Edit Client",
              icon: <PlusCircle size={14} />,
              path: "/clients",
            },
          ]}
        />
      </div>
    </div>
  );
}
