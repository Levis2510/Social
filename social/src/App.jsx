import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/layout/Navbar.jsx'
import Sidebar from './components/layout/Sidebar.jsx'
import Home from './pages/Home.jsx'
import Explore from './pages/Explore.jsx'
import PostDetail from './pages/PostDetail.jsx'
import Login from './pages/Login.jsx'
import ForgotPassword from "./pages/ForgotPassword"
import ResetPassword from "./pages/ResetPassword"
import Register from './pages/Register.jsx'
import ProfileSetup from "./pages/ProfileSetup"
import Profile from './pages/Profile.jsx'
import Messages from './pages/Messages.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import { useAuthStore } from './store/authStore.js'
import Friends from "./pages/Friends"

export default function App() {
  const user = useAuthStore(s => s.user)

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1 max-w-6xl w-full mx-auto px-4 gap-6 mt-6">
        <Sidebar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/post/:id" element={<PostDetail />} />
            <Route
              path="/messages"
              element={
                <ProtectedRoute isAuth={!!user}>
                  <Messages />
                </ProtectedRoute>
              }
            />
            <Route path="/profile" element={<Profile />} />   {/*thêm tạm*/}
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} /> 
            <Route path="/register" element={user ? <Navigate to="/" /> : <Register />} />
            <Route path="/profile-setup" element={<ProfileSetup />} />
            <Route path="*" element={<Navigate to="/" />} />
            <Route path="/friends" element={<Friends />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}
