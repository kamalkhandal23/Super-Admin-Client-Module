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

  const isRouteActive = childrenItems.some(
    (child) => location.pathname === child.path
  );

  return (
    <div
      className="relative"
      onMouseEnter={() => collapsed && setHover(true)}
      onMouseLeave={() => collapsed && setHover(false)}
    >
      <div
        onClick={() => !collapsed && setOpen(!open)}
        className={`flex items-center justify-between px-3 py-2 rounded cursor-pointer transition
          text-[var(--text-brand)]
          ${isRouteActive
            ? "font-medium"
            : ""
          }
          `}
        style={{
          backgroundColor: isRouteActive
            ? "rgba(0,0,0,0.05)"
            : "transparent",
        }}

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

      {/* Expanded Children */}
      {!collapsed && open && (
        <div className="ml-6 mt-1 pl-6 space-y-1 relative">
          <span
            className="absolute left-3 top-0 w-px"
            style={{
              height: "100%",
              backgroundColor: "var(--primary-text)",
              opacity: 0.25,
            }}
          />
          {childrenItems.map((child) => (
            <NavLink
              key={child.path}
              to={child.path}

              className={({ isActive }) =>
                `relative flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-all duration-200
      text-[var(--text-brand)] 

      ${isActive
                  ? "font-semibold shadow-sm"
                  : ""
                }`
              }
              style={({ isActive }) => ({
                backgroundColor: isActive
                  ? "rgba(0,0,0,0.08)"
                  : "transparent",
              })}
            >

              <span
                className="absolute left-[-12px] top-1/2 h-px w-3"
                style={{
                  backgroundColor: "var(--primary-text)",
                  opacity: 0.3,
                }}
              />
              {child.icon}
              <span>{child.label}</span>
            </NavLink>
          ))}
        </div>
      )}

      {/* Collapsed Hover Popup */}
      {collapsed && hover && (
        <div
          className="absolute left-full ml-1 top-0 z-[999] w-56 rounded-lg shadow-2xl py-2"
          style={{
            backgroundColor: "var(--primary-color)",
            color: "var(--primary-text)",
            border: "1px solid rgba(0,0,0,0.08)",
          }}
        >
          <div className="px-3 py-1 text-xs font-semibold opacity-70">
            {label}
          </div>

          {childrenItems.map((child) => (
            <NavLink
              key={child.path}
              to={child.path}
              className={({ isActive }) =>
                `flex items-center gap-2 px-3 py-2 text-sm rounded transition
     text-[var(--text-brand)]
     hover:bg-[var(--primary-text)]/10
     ${isActive ? "font-semibold bg-[var(--primary-text)]/20" : ""}`
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
