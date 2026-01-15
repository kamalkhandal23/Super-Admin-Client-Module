import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function SidebarItem({
  icon,
  label,
  collapsed,
  childrenItems = [],
}) {
  const [open, setOpen] = useState(false);
  const [hover, setHover] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => collapsed && setHover(true)}
      onMouseLeave={() => collapsed && setHover(false)}
    >
      <div
        onClick={() => !collapsed && setOpen(!open)}
        className={`flex items-center justify-between px-3 py-2 rounded cursor-pointer
          ${open && !collapsed
            ? "bg-brand-dark text-white"
            : "hover:bg-brand-dark/10 text-brand-dark"}
        `}

      >
        <div className="flex items-center gap-3">
          {icon}
          {!collapsed && (
            <span className="text-sm font-medium">{label}</span>
          )}
        </div>

        {!collapsed && childrenItems.length > 0 && (
          <ChevronDown
            size={16}
            className={`transition ${open ? "rotate-180" : ""}`}
          />
        )}
      </div>

      {!collapsed && open && (
        <div className="relative ml-9 mt-1 pl-4 space-y-1">
          <span className="absolute left-0 top-0 h-full w-px bg-slate-300" />
          {childrenItems.map((child, idx) => (
            <div 
              key={idx}
            className="relative flex items-center gap-2 text-sm px-2 py-1 rounded hover:bg-brand-dark/10 cursor-pointer">
            <span className="absolute -left-4 top-1/2 h-px w-3 bg-slate-300" />
          

              {child.icon}
              <span>{child.label}</span>
            </div>
          ))}
        </div>
      )}

      {collapsed && hover && (
        <div className="absolute left-12 top-0 z-50 w-52 bg-brand-bg border border-brand-dark/20 rounded-lg shadow-xl py-1">

          <div className="px-3 py-1 text-xs font-semibold text-brand-dark/70">
            {label}
          </div>

          {childrenItems.map((child, idx) => (
            <div
              key={idx}
              className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-brand-dark/5 cursor-pointer"
            >
              <span className="text-brand-dark/70">{child.icon}</span>

              <span>{child.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
