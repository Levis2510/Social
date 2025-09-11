import { Outlet } from "react-router-dom";

export default function Main({ isExpanded }) {
  return (
    <main
      className="flex-1 p-6 transition-all duration-300 bg-gray-200 "
      style={{
        marginLeft: isExpanded ? "0" : "0", 
      }}
    >
      <Outlet />
    </main>
  );
}
