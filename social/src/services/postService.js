import api from './api';

// Lấy danh sách bài viết
export const fetchPosts = async (userId) => {
    const { data } = await api.get("/api/get-post", {
        params: { userId }, // -> /api/get-post?userId=1
    });
    return data;
};
// Tạo bài viết API
export const createPost = (data) => api.post('/api/post', data);


// Xóa bài viết API
export const deletePost = (id) => api.delete(`/posts/${id}`);

// Cập nhật bài viết API
export const updatePost = (id, data) => api.put(`/posts/${id}`, data);
