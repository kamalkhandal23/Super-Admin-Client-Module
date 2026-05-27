import { useState } from "react";
import {
  LayoutDashboard,
  Users,
  PlusCircle,
  BarChart3,
  ChevronLeft,
} from "lucide-react";
import SidebarItem from "./SidebarItem";

import FullLogo from "../assets/QuipHire-logo.svg";
import IconLogo from "../assets/fav-icon.png";

export default function Sidebar({isDrawerOpen}) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div
  className={`sticky top-0 self-start relative bg-white z-20 dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 h-screen transition-all duration-300
    ${collapsed ? "w-20" : "w-64"}`}
  style={{
    backgroundColor: "var(--primary-color)",
    color: "var(--primary-text)",
    borderRight: "1px solid rgba(0,0,0,0.08)",
  }}
>
      {/* Logo Section */}
      <div
        className={`h-[56px] flex items-center ${collapsed ? "justify-center" : "justify-start px-6 py-4"}`}
        style={{
          borderBottom: "1px solid rgba(0,0,0,0.08)",
        }}
      >
        {!collapsed ? (
          <img src={FullLogo} alt="QuipHire" className="h-9 object-contain" />
        ) : (
          <img src={IconLogo} alt="QuipHire" className="h-7 object-contain" />
        )}
      </div>

      {/* Collapse Button */}
      {!isDrawerOpen && (
      <button
      onClick={() => setCollapsed(!collapsed)}
      className="absolute top-4 -right-3
                 h-6 w-6 rounded-full flex items-center justify-center 
                 shadow-lg z-[999]"
      style={{
        backgroundColor: "#ffffff",
        border: "1px solid rgba(0,0,0,0.15)",
      }}
    >
      <ChevronLeft
        size={14}
        className={`transition-transform ${collapsed ? "rotate-180" : ""}`}
        style={{ color: "#111827" }}
      />
    </button>
    
      )}

      {/* Menu Items */}
      <div className="p-2 space-y-1">
        <SidebarItem
          icon={<LayoutDashboard size={18} />}
          label="Dashboard"
          collapsed={collapsed}
          childrenItems={[
            {
              label: "Overview",
              icon: <LayoutDashboard size={14} />,
              path: "/dashboard/overview",
            },
            {
              label: "Analytics",
              icon: <BarChart3 size={14} />,
              path: "/dashboard/analytics",
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
