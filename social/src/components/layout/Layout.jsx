import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function Layout() {
 return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Body */}
      <div className="flex flex-1">
        {/* Sidebar chỉ hiển thị từ md trở lên */}
        <div className="hidden md:block">
          <Sidebar />
        </div>

        {/* Main content */}
        <div
          className="flex-1 ml-0 md:ml-16 md:group-hover:ml-64 transition-all duration-300"
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
}
