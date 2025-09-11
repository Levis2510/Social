import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import Friends from "./pages/Friends";
import Messages from "./pages/Messages";
import Profile from "./pages/Profile";
import ProfileSetup from "./pages/ProfileSetup";
import PostDetail from "./pages/PostDetail";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Demo from "./pages/Demo";

export default function App() {
  return (
    <Routes>
      {/* Layout bọc tất cả page */}
      <Route element={<Layout />}>
        {/* Các trang chính */}
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/friends" element={<Friends />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/profile-setup" element={<ProfileSetup />} />
        <Route path="/post/:id" element={<PostDetail />} />
        <Route path="/demo" element={<Demo />} />

        {/* Các trang auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* Redirect nếu không match */}
        <Route path="*" element={<Navigate to="/" />} />
      </Route>
    </Routes>
  );
}
