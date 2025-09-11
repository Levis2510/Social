import { NavLink, Link } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import { Home, Compass, MessageCircle, Users } from "lucide-react";

export default function Sidebar({ isExpanded, setIsExpanded }) {
  const { user } = useAuthStore();
  const menu = [
    { to: "/", label: "Bảng tin", icon: <Home className="w-5 h-5" /> },
    { to: "/explore", label: "Khám phá", icon: <Compass className="w-5 h-5" /> },
    { to: "/friends", label: "Bạn bè", icon: <Users className="w-5 h-5" /> },
    { to: "/messages", label: "Trò chuyện", icon: <MessageCircle className="w-5 h-5" /> },
  ];

  return (
    <aside
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
      className={`group hidden md:flex flex-col bg-stone-200 border-r border-black  shadow-lg transition-all duration-300 flex-shrink-0
      ${isExpanded ? "w-64" : "w-16"}`}
    >
      <div className="p-2 space-y-4 flex-1 overflow-y-auto">
        {user && (
          <Link
            to={`/profile/${user.id}`}
            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-50"
          >
            <img
              src={user.avatar || `https://ui-avatars.com/api/?name=${user.name}`}
              alt="avatar"
              className="w-10 h-10 rounded-full border"
            />
            <span className="font-medium text-gray-800 hidden group-hover:inline">
              {user.name}
            </span>
          </Link>
        )}

        <nav className="space-y-1">
          {menu.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors
                ${isActive
                  ? "bg-blue-50 text-blue-600 font-semibold"
                  : "text-gray-700 hover:bg-gray-100"}`
              }
            >
              {item.icon}
              <span className="hidden group-hover:inline">{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>
    </aside>
  );
}
