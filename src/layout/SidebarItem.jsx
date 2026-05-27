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
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div
        onClick={() => !collapsed && setOpen(!open)}
        className={`flex items-center w-full px-3 py-3 rounded-full text-sm font-medium cursor-pointer transition-all duration-200 ${
          isRouteActive
            ? "bg-[hsl(192deg,27.78%,92.94%)] text-[hsl(195deg,66%,31%)]"
            : "text-[#111827] hover:text-[#1B6983] hover:bg-[#f2f2f2]"
        } ${collapsed ? "justify-center" : "justify-between"}`}

      >
        <div className="flex items-center">
          {icon}
          {!collapsed && (
            <span className="flex-1 text-left ml-4">{label}</span>
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
        <div className="relative mt-0 ml-5">
          <span
            className="absolute left-0 top-0 border-l-2 border-gray-200"
            style={{
              height: `${(childrenItems.length - 1) * 40}px`,
            }}
          />
          {childrenItems.map((child) => {
            return (
              <div key={child.path} className="relative h-10 pl-5">
                <span className="absolute left-0 top-0 h-6 w-6 rounded-bl-2xl border-b-2 border-l-2 border-gray-200" />
                <NavLink
                  to={child.path}
                  className={({ isActive }) =>
                    `relative top-2 block w-full px-3 py-1 text-sm transition-all duration-150 ${
                      isActive
                        ? "bg-[hsl(192deg,27.78%,92.94%)] text-[#1B6983] font-medium rounded-full"
                        : "text-[#111827] hover:text-[#1B6983] hover:bg-[#e8f0f2] hover:rounded-full"
                    }`
                  }
                >
                  {child.label}
                </NavLink>
              </div>
            );
          })}
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
     text-[#111827] hover:text-[#1B6983]
     hover:bg-[var(--primary-text)]/10
     ${isActive ? "font-semibold text-[#1B6983] bg-[var(--primary-text)]/20" : ""}`
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
