// client/src/services/api.js

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const postService = {
  getAllPosts: async () => {
    const res = await fetch(`${BASE_URL}/posts`);
    if (!res.ok) throw new Error('Failed to fetch posts');
    return await res.json();
  },

  getPostById: async (id) => {
    const res = await fetch(`${BASE_URL}/posts/${id}`);
    if (!res.ok) throw new Error('Failed to fetch post');
    return await res.json();
  },

  createPost: async (data) => {
    const res = await fetch(`${BASE_URL}/posts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to create post');
    return await res.json();
  },

  updatePost: async (id, data) => {
    const res = await fetch(`${BASE_URL}/posts/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to update post');
    return await res.json();
  },

  deletePost: async (id) => {
    const res = await fetch(`${BASE_URL}/posts/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Failed to delete post');
    return await res.json();
  },
};
