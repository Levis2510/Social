import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home.jsx";
import Explore from "./pages/Explore.jsx";
import PostDetail from "./pages/PostDetail.jsx";
import Login from "./pages/Login.jsx";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Register from "./pages/Register.jsx";
import ProfileSetup from "./pages/ProfileSetup";
import Profile from "./pages/Profile.jsx";
import Messages from "./pages/Messages.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import { useAuthStore } from "./store/authStore.js";
import Friends from "./pages/Friends";

export default function App() {
  const { user, fetchMe, token } = useAuthStore();

  useEffect(() => {
    if (token && !user) {
      fetchMe();
    }
  }, [token, user, fetchMe]);

  return (
    <Routes>
      {/* Tất cả routes đều nằm trong Layout */}
      <Route element={<Layout />}>
        {/* Các trang chính */}
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
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/profile-setup" element={<ProfileSetup />} />
        <Route path="/friends" element={<Friends />} />

        {/* Các trang Auth cũng render trong Layout */}
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route path="/register" element={user ? <Navigate to="/" /> : <Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* Redirect */}
        <Route path="*" element={<Navigate to="/" />} />
      </Route>
    </Routes>
  );
}
