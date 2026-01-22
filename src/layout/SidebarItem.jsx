import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { ChevronDown } from "lucide-react";

export default function SidebarItem({
  icon,
  label,
  collapsed,
  childrenItems = [],
}) {
  const [open, setOpen] = useState(false);
  const [hover, setHover] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const match = childrenItems.some(
      (child) => child.path === location.pathname
    );
    if (match && !collapsed) setOpen(true);
  }, [location.pathname, childrenItems, collapsed]);

  return (
    <div
      className="relative"
      onMouseEnter={() => collapsed && setHover(true)}
      onMouseLeave={() => collapsed && setHover(false)}
    >

      <div
        onClick={() => !collapsed && setOpen(!open)}
        className={`flex items-center justify-between px-3 py-2 rounded cursor-pointer transition
          ${
            open && !collapsed
              ? "bg-brand-bg text-brand-dark"
              : "text-slate-700 hover:bg-slate-100"
          }`}
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
            className={`transition-transform ${open ? "rotate-180" : ""}`}
          />
        )}
      </div>


      {!collapsed && open && (
        <div className="ml-9 mt-1 pl-4 space-y-1 relative">
          <span className="absolute left-0 top-0 h-full w-px bg-slate-300" />

          {childrenItems.map((child) => (
            <NavLink
              key={child.path}
              to={child.path}
              className={({ isActive }) =>
                `relative flex items-center gap-2 px-2 py-1 rounded text-sm transition
                ${
                  isActive
                    ? "bg-brand-bg text-brand-dark font-medium"
                    : "hover:bg-slate-100 text-slate-600"
                }`
              }
            >
              <span className="absolute -left-4 top-1/2 h-px w-3 bg-slate-300" />
              {child.icon}
              <span>{child.label}</span>
            </NavLink>
          ))}
        </div>
      )}

      {collapsed && hover && (
        <div className="absolute left-12 top-0 z-50 w-52 bg-white border rounded-lg shadow-xl py-1">
          <div className="px-3 py-1 text-xs font-semibold text-slate-500">
            {label}
          </div>

          {childrenItems.map((child) => (
            <NavLink
              key={child.path}
              to={child.path}
              className={({ isActive }) =>
                `flex items-center gap-2 px-3 py-2 text-sm rounded transition
                ${
                  isActive
                    ? "bg-brand-bg text-brand-dark font-medium"
                    : "hover:bg-slate-100"
                }`
              }
            >
              {child.icon}
              <span>{child.label}</span>
            </NavLink>
          ))}
        </div>
      )}
    </div>
  );
}
