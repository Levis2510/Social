import { Link, NavLink, useNavigate } from "react-router-dom"
import { useAuthStore } from "../../store/authStore"
import { useState, useRef, useEffect } from "react"
import { Menu, X } from "lucide-react"

export default function Navbar() {
  const { user, logout } = useAuthStore()
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const menuRef = useRef(null)
  const navigate = useNavigate()
  const [userMenuOpen, setUserMenuOpen] = useState(false) 
  const [mobileMenu, setMobileMenu] = useState(false)

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleSearch = (e) => {
    e.preventDefault()
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`)
      setQuery("")
      if (mobileMenu) setMobileMenu(false)
    }
  }

  return (
    <header className="border-b bg-indigo-100 sticky top-0 z-50">
      <nav className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link to="/" className="font-bold text-xl whitespace-nowrap">
          Social<span className="text-blue-600">.</span>
        </Link>

        {/* Search - ẩn ở mobile */}
        <form
          onSubmit={handleSearch}
          className="flex-1 max-w-md hidden sm:block"
        >
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Tìm kiếm..."
            className="w-full px-3 py-1.5 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </form>

        {/* Nút menu mobile */}
        <button
          className="sm:hidden p-2 rounded hover:bg-gray-100"
          onClick={() => setMobileMenu(!mobileMenu)}
        >
          {mobileMenu ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Menu desktop */}
        <div className="hidden sm:flex items-center gap-4">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `px-2 py-1 ${
                isActive
                  ? "text-blue-600 font-semibold border-b-2 border-blue-600"
                  : "text-gray-700 hover:text-blue-600"
              }`
            }
          >
            Trang chủ
          </NavLink>
          <NavLink
            to="/explore"
            className={({ isActive }) =>
              `px-2 py-1 ${
                isActive
                  ? "text-blue-600 font-semibold border-b-2 border-blue-600"
                  : "text-gray-700 hover:text-blue-600"
              }`
            }
          >
            Khám phá
          </NavLink>
          {user && (
            <NavLink
              to="/messages"
              className={({ isActive }) =>
                `px-2 py-1 ${
                  isActive
                    ? "text-blue-600 font-semibold border-b-2 border-blue-600"
                    : "text-gray-700 hover:text-blue-600"
                }`
              }
            >
              Tin nhắn
            </NavLink>
          )}
        </div>

        {/* User / Auth */}
        <div
          className="hidden sm:flex items-center gap-3 relative"
          ref={menuRef}
        >
          {user ? (
            <>
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2 focus:outline-none"
              >
                <img
                  src={
                    user.avatar_url
                      ? user.avatar_url
                      : `https://ui-avatars.com/api/?name=${encodeURIComponent(
                          user.name
                        )}`
                  }
                  alt="avatar"
                  className="w-8 h-8 rounded-full border"
                />
                <span className="hidden sm:inline font-medium text-gray-700">
                  {user.name}
                </span>
              </button>

              {userMenuOpen && (
                <div className="absolute right-0 top-12 w-48 bg-white border rounded-lg shadow-lg py-2 z-50 animate-fade-in">
                  <Link
                    to={`/profile/${user.id}`}
                    onClick={() => setUserMenuOpen(false)}
                    className="block px-4 py-2 hover:bg-gray-100 text-gray-700"
                  >
                    Trang cá nhân
                  </Link>
                  <button
                    onClick={() => {
                      logout()
                      setUserMenuOpen(false)
                      navigate("/")
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700"
                  >
                    Đăng xuất
                  </button>
                </div>
              )}
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700"
              >
                Đăng nhập
              </Link>
              <Link
                to="/register"
                className="px-3 py-1 rounded border hover:bg-gray-50"
              >
                Đăng ký
              </Link>
            </>
          )}
        </div>
      </nav>

      {/* Mobile menu dropdown */}
      {mobileMenu && (
        <div className="sm:hidden border-t bg-white px-4 py-3 space-y-2">
          <form onSubmit={handleSearch}>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Tìm kiếm..."
              className="w-full px-3 py-1.5 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </form>

          <NavLink
            to="/"
            onClick={() => setMobileMenu(false)}
            className="block py-2 text-gray-700 hover:text-blue-600"
          >
            Trang chủ
          </NavLink>
          <NavLink
            to="/explore"
            onClick={() => setMobileMenu(false)}
            className="block py-2 text-gray-700 hover:text-blue-600"
          >
            Khám phá
          </NavLink>
          {user && (
            <NavLink
              to="/messages"
              onClick={() => setMobileMenu(false)}
              className="block py-2 text-gray-700 hover:text-blue-600"
            >
              Tin nhắn
            </NavLink>
          )}

          {user ? (
            <>
              <Link
                to={`/profile/${user.id}`}
                onClick={() => setMobileMenu(false)}
                className="block py-2 text-gray-700 hover:text-blue-600"
              >
                Trang cá nhân
              </Link>
              <button
                onClick={() => {
                  logout()
                  setMobileMenu(false)
                  navigate("/")
                }}
                className="block w-full text-left py-2 text-gray-700 hover:text-blue-600"
              >
                Đăng xuất
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                onClick={() => setMobileMenu(false)}
                className="block py-2 text-gray-700 hover:text-blue-600"
              >
                Đăng nhập
              </Link>
              <Link
                to="/register"
                onClick={() => setMobileMenu(false)}
                className="block py-2 text-gray-700 hover:text-blue-600"
              >
                Đăng ký
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  )
}

