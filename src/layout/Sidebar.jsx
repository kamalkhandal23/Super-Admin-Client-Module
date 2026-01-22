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


export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div
      className={`relative h-screen bg-white border-r border-brand-dark/20 transition-all duration-300
      ${collapsed ? "w-16" : "w-64"}`}
    >

      <div className="h-14 flex items-center justify-center border-b">
        {!collapsed ? (
          <img src={FullLogo} alt="QuipHire" className="h-10" />
        ) : (
          <img src={IconLogo} alt="QuipHire" className="h-7" />
        )}
      </div>

      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-4 z-50
                   h-6 w-6 rounded-full bg-white border border-brand-dark/20
                   flex items-center justify-center shadow"
      >
        <ChevronLeft
          size={14}
          className={`transition-transform ${
            collapsed ? "rotate-180" : ""
          }`}
        />
      </button>


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
