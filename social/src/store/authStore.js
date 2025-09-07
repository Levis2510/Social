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
  token: sessionStorage.getItem('token') || localStorage.getItem('token') || null,

  // Đăng nhập
  login: async (email, password, remember) => {
    set({ loading: true, error: null })
    try {
      const res = await fetch(
        `http://localhost:5175/api/login?username=${email}&password=${password}`,
        { method: "GET" }
      )

      if (!res.ok) throw new Error("Sai tài khoản hoặc mật khẩu")

      const account = await res.json()
      console.log("👉 Response từ backend (account):", account)

      // nếu backend trả về token
      set({ user: account, token: account.token, loading: false })

      const storage = remember ? localStorage : sessionStorage
      storage.setItem("token", account.token)
      storage.setItem("user", JSON.stringify(account))
      storage.setItem("userId", account.account_id || account.accountId || account.userId);


      return account
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
