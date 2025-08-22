// src/services/authService.js
import api from './api';

// Đăng nhập
export const loginService = (data) => api.post('/auth/login', data);

// Đăng ký
export const registerService = (data) => api.post('/auth/register', data);

// Lấy thông tin user đang đăng nhập
export const meService = () => api.get('/auth/me');
