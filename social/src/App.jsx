// import { Routes, Route, Navigate } from 'react-router-dom'
// import { useEffect } from 'react'
// import Navbar from './components/layout/Navbar.jsx'
// import Sidebar from './components/layout/Sidebar.jsx'
// import Home from './pages/Home.jsx'
// import Explore from './pages/Explore.jsx'
// import PostDetail from './pages/PostDetail.jsx'
// import Login from './pages/Login.jsx'
// import ForgotPassword from "./pages/ForgotPassword"
// import ResetPassword from "./pages/ResetPassword"
// import Register from './pages/Register.jsx'
// import ProfileSetup from "./pages/ProfileSetup"
// import Profile from './pages/Profile.jsx'
// import Messages from './pages/Messages.jsx'
// import ProtectedRoute from './components/ProtectedRoute.jsx'
// import { useAuthStore } from './store/authStore.js'
// import Friends from "./pages/Friends"
   {/* Test post demo */}
import Demo from "./pages/Demo"; 



export default function App() {
  return <Demo />;
}
// export default function App() {
//   const { user, fetchMe, token } = useAuthStore()
//   useEffect(() => {
//     if (token && !user) {
//       fetchMe()
//     }
//   }, [token, user, fetchMe])

//   return (
//     <div className="min-h-screen flex flex-col">
//       <Navbar />
//       <div class="flex flex-1 w-auto gap-6 ml-4 mt-6">
//         <Sidebar />
//         <main className="flex-1">
//           <Routes>
//             <Route path="/" element={<Home />} />
//             <Route path="/explore" element={<Explore />} />
//             <Route path="/post/:id" element={<PostDetail />} />

//             <Route
//               path="/messages"
//               element={
//                 <ProtectedRoute isAuth={!!user}>
//                   <Messages />
//                 </ProtectedRoute>
//               }
//             />
//             <Route path="/profile/:id" element={<Profile />} />
//             <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
//             <Route path="/forgot-password" element={<ForgotPassword />} />
//             <Route path="/reset-password" element={<ResetPassword />} /> 
//             <Route path="/register" element={user ? <Navigate to="/" /> : <Register />} />
//             <Route path="/profile-setup" element={<ProfileSetup />} />
//             <Route path="/friends" element={<Friends />} />
//             <Route path="*" element={<Navigate to="/" />} />
//           </Routes>
//         </main>
//       </div>
//     </div>
//   )
// }
