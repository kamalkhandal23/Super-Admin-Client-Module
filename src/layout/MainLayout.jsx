import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function MainLayout({ children }) {
  return (
    <div className="h-screen flex">

      <Sidebar />

      <div className="flex-1 flex flex-col">

        <Topbar />

        
          {children}
        
      </div>
    </div>
  );
}
