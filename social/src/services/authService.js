// src/services/authService.js
import API from './api';

// Đăng ký
export const registerService = async (payload) => {
  const res = await API.post('/api/register', payload);
  return res.data;
};

// Đăng nhập
export const loginService = async (email, password) => {
  const res = await API.post('/api/login', { email, password });
  return res.data;
};

// Lấy thông tin user từ token
export const meService = async () => {
  const res = await API.get('/api/me');
  return res.data;
};
