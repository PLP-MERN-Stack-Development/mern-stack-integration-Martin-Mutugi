// client/src/components/PostList.jsx

import React, { useEffect, useState } from 'react';
import { postService } from '../services/api';

function PostList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const data = await postService.getAllPosts();
        setPosts(data.posts || []);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

  if (loading) return <p>Loading posts...</p>;

  return (
    <div>
      <h2>All Blog Posts</h2>
      <ul>
        {posts.map((post) => (
          <li key={post._id}>
            <strong>{post.title}</strong> — {post.excerpt || 'No excerpt'}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PostList;
