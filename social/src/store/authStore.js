import { create } from 'zustand';
import {
  loginService,
  registerService,
  meService,
} from '../services/authService';

export const useAuthStore = create((set, get) => ({
  user: null,
  loading: false,
  error: null,

  // Đăng nhập
  login: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const res = await loginService(email, password);
      localStorage.setItem('token', res.token);
      set({ user: res.user, loading: false });
    } catch (err) {
      set({
        error: err.response?.data?.message || err.message,
        loading: false,
      });
    }
  },

  // Đăng ký
  register: async (payload) => {
    set({ loading: true, error: null });
    try {
      const res = await registerService(payload);
      localStorage.setItem('token', res.token);
      set({ user: res.user, loading: false });
    } catch (err) {
      set({
        error: err.response?.data?.message || err.message,
        loading: false,
      });
    }
  },

  // Lấy thông tin user từ token
  fetchMe: async () => {
    set({ loading: true, error: null });
    try {
      const res = await meService();
      set({ user: res.user, loading: false });
    } catch (err) {
      console.error('fetchMe failed:', err);
      set({ user: null, loading: false });
    }
  },

  // Đăng xuất
  logout: () => {
    localStorage.removeItem('token');
    set({ user: null });
  },
}));
