// client/src/components/SinglePost.jsx

import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { postService } from '../services/api';

function SinglePost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchPost() {
      try {
        const data = await postService.getPostById(id);
        setPost(data.post || null);
      } catch (err) {
        console.error('Error fetching post:', err);
        setError('Failed to load post.');
      } finally {
        setLoading(false);
      }
    }

    fetchPost();
  }, [id]);

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this post?')) {
      try {
        await postService.deletePost(post._id);
        navigate('/');
      } catch (err) {
        console.error('Delete failed:', err);
        setError('Failed to delete post.');
      }
    }
  };

  if (loading) return <p>Loading post...</p>;
  if (!post) return <p>Post not found.</p>;

  return (
    <div>
      <h2>{post.title}</h2>
      <p>{post.content || 'No content available.'}</p>

      <div style={{ marginTop: '1rem' }}>
        <Link to={`/edit/${post._id}`} style={{ marginRight: '1rem' }}>
          Edit This Post
        </Link>
        <button onClick={handleDelete}>Delete Post</button>
      </div>

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default SinglePost;
