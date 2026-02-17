import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div className="min-h-screen flex relative">

      {/* Sidebar wrapper */}
      <div className="relative shrink-0">
        <Sidebar />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col relative">
        <Topbar />
        <div className="flex-1 overflow-auto bg-gray-50">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
