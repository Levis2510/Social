// src/services/postService.js
import api from './api';

// Lấy danh sách bài viết
export const fetchPosts = () => api.get('/posts');

// Tạo bài viết mới
export const createPost = (data) => api.post('/posts', data);

// Xóa bài viết
export const deletePost = (id) => api.delete(`/posts/${id}`);

// Cập nhật bài viết
export const updatePost = (id, data) => api.put(`/posts/${id}`, data);
