import { create } from 'zustand'
import {
  loginService,
  registerService,
  meService,
} from '../services/authService'

export const useAuthStore = create((set, get) => ({
  user: null,
  loading: false,
  error: null,

  // Đăng nhập
  login: async (payload) => {
    set({ loading: true, error: null })
    try {
      const res = await loginService(payload)
      if(res.userId){
        const userId = res.userId
        if (userId) {
        console.log(userId);
      return userId
}
      }
    } catch (err) {
      set({ error: err.message, loading: false })
      return null
    }
  },

  // Đăng ký
  register: async (payload) => {
    set({ loading: true, error: null })
    try {
      const res = await registerService(payload)

      if (res.accountId || res.userId) {
        const userId = res.accountId || res.userId
        sessionStorage.setItem("userId", userId)

        // chỉ cần userId, chưa cần token
        set({ loading: false, user: { id: userId } })
      } else {
        set({ loading: false })
      }

      return true
    } catch (err) {
      set({
        error: err.response?.data?.message || err.message,
        loading: false,
      })
      return false
    }
  },

  // Lấy thông tin user hiện tại
  fetchMe: async () => {
    set({ loading: true, error: null })
    try {
      const res = await meService()
      const user = res.user || res
      set({ user, loading: false })
    } catch (err) {
      console.error("fetchMe failed:", err)
      set({ user: null, token: null, loading: false })
    }
  },

  // Đăng xuất
  logout: () => {
    sessionStorage.clear()
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    set({ user: null, token: null, error: null })
  },

  // Quên mật khẩu
  sendPasswordReset: async (email) => {
    set({ loading: true, error: null })
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      console.log("📧 Reset email sent to:", email)
      set({ loading: false })
      return true
    } catch (err) {
      set({ error: err.message, loading: false })
      return false
    }
  },

  // Đặt lại mật khẩu
  resetPassword: async (token, newPassword) => {
    set({ loading: true, error: null })
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      console.log("🔑 Reset password with token:", token, " new password:", newPassword)
      set({ loading: false })
      return true
    } catch (err) {
      set({ error: err.message, loading: false })
      return false
    }
  },
}))
