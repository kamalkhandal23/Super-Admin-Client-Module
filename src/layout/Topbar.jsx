import { useState, useRef, useEffect, useContext } from "react";
import { MoreVertical, User, LogOut, Bell } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../contexts/ThemeContext";

export default function Topbar() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const { setPrimaryColor } = useContext(ThemeContext);

  const user = JSON.parse(localStorage.getItem("superadmin_auth"));

  const handleLogout = () => {
    localStorage.removeItem("superadmin_auth");
    navigate("/login");
  };

  const themeColors = [
    "#ffffff",
    "#5B47FB", "#1976D2", "#5746af",
    "#009688", "#00BCD4", "#f59e0b",
    "#10b981", "#f43f5e", "#FF9800",
    "#8e24aa", "#607D8B", "#1b6983"
  ];


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getInitials = (name) => {
    if (!name) return "SA";
    const parts = name.split(" ");
    return (
      (parts[0]?.[0] || "") +
      (parts[parts.length - 1]?.[0] || "")
    ).toUpperCase();
  };

  return (
    <div
      className="flex justify-between items-center px-6 h-16 sticky top-0 z-10 shadow-sm"
      style={{
        backgroundColor: "var(--primary-color)",
        color: "var(--primary-text)",
      }}

    >
      {/* Logo */}
      {/* <div className="flex items-center gap-3">
        <img
          src="/quiphire-logo.svg"
          alt="Logo"
          className="h-6 object-contain"
        />
      </div> */}

      <div
        className="relative flex items-center gap-4 ml-auto"
        ref={menuRef}
      >

        {/* Notification */}
        <button className="p-2 rounded-full hover:bg-white/20 transition relative">
          <Bell size={18} />
          <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
        </button>

        {/* Avatar */}
        <div className="h-8 w-8 rounded-full bg-gray-200 text-gray-800 flex items-center justify-center text-sm font-semibold">
          {getInitials(user?.name || "Super Admin")}
        </div>

        {/* Name */}
        <div className="hidden sm:block leading-tight">
          <p className="text-xs opacity-80">Welcome back 👋</p>
          <span className="text-sm font-medium">
            {user?.name || "Super Admin"}
          </span>
        </div>

        {/* Menu Button */}
        <button
          onClick={() => setOpen(!open)}
          className="p-1 rounded-full hover:bg-white/20 transition"
        >
          <MoreVertical size={18} />
        </button>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -8 }}
              transition={{ duration: 0.18 }}
              className="absolute right-0 top-full mt-2 w-60 bg-white rounded-2xl shadow-2xl py-3"
            >
              {/* Profile */}
              <button
                onClick={() => {
                  setOpen(false);
                  navigate("/profile");
                }}
                className="w-full flex items-center px-4 py-2 text-sm gap-2 hover:bg-gray-100 text-gray-700"
              >
                <User size={16} /> View Profile
              </button>

              <div className="border-t my-3"></div>

              {/* Palette */}
              <div className="px-4 grid grid-cols-5 gap-3 mb-3">
                {themeColors.map((color, i) => (
                  <button
                    key={i}
                    style={{ backgroundColor: color }}
                    className="w-6 h-6 rounded-md border border-gray-300
                 hover:scale-105 hover:ring-2 hover:ring-gray-400
                 transition-all duration-200"
                    onClick={() => setPrimaryColor(color)}
                  />
                ))}
              </div>


              <div className="border-t my-3"></div>

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="w-full flex items-center px-4 py-2 text-sm gap-2 hover:bg-gray-100 text-red-600"
              >
                <LogOut size={16} /> Logout
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
