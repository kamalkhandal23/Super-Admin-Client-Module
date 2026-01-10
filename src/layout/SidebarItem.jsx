import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function SidebarItem({
  icon,
  label,
  collapsed,
  childrenItems = [],
}) {
  const [open, setOpen] = useState(false);
  const [hover, setHover] = useState(false);
  const navigate = useNavigate();

  const items = Array.isArray(childrenItems) ? childrenItems : [];

  return (
    <div
      className="relative"
      onMouseEnter={() => collapsed && setHover(true)}
      onMouseLeave={() => collapsed && setHover(false)}
    >

      <div
        onClick={() => !collapsed && setOpen(!open)}
        className={`flex items-center justify-between px-3 py-2.5 rounded-lg cursor-pointer transition-all
${open && !collapsed ? "bg-blue-50 text-blue-600 shadow-[inset_3px_0_0_#2563eb]" : "hover:bg-slate-100"}`}
      >
        <div className="flex items-center gap-3">
          {icon}
          {!collapsed && (
            <span className="text-sm font-medium">{label}</span>
          )}
        </div>

        {!collapsed && items.length > 0 && (
          <ChevronDown
            size={16}
            className={`transition ${open ? "rotate-180" : ""}`}
          />
        )}
      </div>

      {!collapsed && open && items.length > 0 && (
        <div className="ml-9 mt-1 space-y-1">
          {items.map((child, idx) => (
            <div
              key={idx}
              onClick={() => navigate(child.path)}
              className="text-sm px-2 py-1 rounded hover:bg-blue-50 cursor-pointer"
            >
              {child.label}
            </div>
          ))}
        </div>
      )}

      {collapsed && hover && items.length > 0 && (
        <div
          className="absolute left-[3.0rem] top-1 z-50 w-48 bg-white border border-slate-200 rounded-lg shadow-lg py-1"
        >
          <div className="px-3 py-1 text-xs font-semibold text-gray-500">
            {label}
          </div>

          {items.map((child, idx) => (
            <div
              key={idx}
              onClick={() => navigate(child.path)}
              className="px-3 py-2 text-sm hover:bg-blue-50 cursor-pointer"
            >
              {child.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
