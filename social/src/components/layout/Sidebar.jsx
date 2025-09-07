import { NavLink, Link } from "react-router-dom"
import { useAuthStore } from "../../store/authStore"
import { Home, Compass, MessageCircle, Users } from "lucide-react"

export default function Sidebar() {
  const { user } = useAuthStore()

  const menu = [
    { to: "/", label: "Bảng tin", icon: <Home className="w-5 h-5" /> },
    { to: "/explore", label: "Khám phá", icon: <Compass className="w-5 h-5" /> },
    { to: "/friends", label: "Bạn bè", icon: <Users className="w-5 h-5" /> },
    { to: "/messages", label: "Trò chuyện", icon: <MessageCircle className="w-5 h-5" /> },
  ]

  return (
    <aside className="hidden md:flex flex-col w-64 h-[calc(100vh-64px)]  bg-indigo-100 border-r border-gray-200 shadow-lg sticky top-16 left-0">
    <div className="p-2 space-y-4 flex-1 overflow-y-auto">

        {/* User info */}
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
            <span className="font-medium text-gray-800">{user.name}</span>
          </Link>
        )}

        {/* Menu */}
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
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </aside>
  )
} 
