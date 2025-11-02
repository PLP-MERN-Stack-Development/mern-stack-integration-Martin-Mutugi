import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function PostForm() {
  const { id } = useParams(); // used for edit mode
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch post if editing
  useEffect(() => {
    if (id) {
      fetch(`${import.meta.env.VITE_API_URL}/posts/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setFormData({
            title: data.post?.title || '',
            content: data.post?.content || '',
          });
        })
        .catch((err) => {
          console.error('Error loading post:', err);
          setError('Failed to load post.');
        });
    }
  }, [id]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // ✅ Validation before sending
    if (!formData.title.trim() || !formData.content.trim()) {
      setError('Title and content are required.');
      return;
    }

    setLoading(true);

    const method = id ? 'PUT' : 'POST';
    const url = id
      ? `${import.meta.env.VITE_API_URL}/posts/${id}`
      : `${import.meta.env.VITE_API_URL}/posts`;

    const token = localStorage.getItem('token'); // ✅ get token

    try {
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // ✅ include token
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to save post');
      }

      navigate('/');
    } catch (error) {
      console.error('Error saving post:', error);
      setError(error.message || 'Failed to save post.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>{id ? 'Edit Post' : 'Create New Post'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Post Title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <br />
        <textarea
          name="content"
          placeholder="Post Content"
          value={formData.content}
          onChange={handleChange}
          required
        />
        <br />
        <button type="submit" disabled={loading}>
          {loading ? 'Saving...' : id ? 'Update Post' : 'Create Post'}
        </button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default PostForm;
