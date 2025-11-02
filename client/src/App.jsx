import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import PostList from './components/PostList';
import SinglePost from './components/SinglePost';
import PostForm from './components/PostForm';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import ProtectedRoute from './components/ProtectedRoute';
import { useAuth } from './context/AuthContext';

function App() {
  const { user, logout } = useAuth();

  return (
    <Router>
      <div style={{ padding: '1rem' }}>
        <h1>MERN Blog</h1>
        <nav style={{ marginBottom: '1rem' }}>
          <Link to="/" style={{ marginRight: '1rem' }}>All Posts</Link>
          {user && (
            <Link to="/create" style={{ marginRight: '1rem' }}>Create New Post</Link>
          )}
          {!user ? (
            <>
              <Link to="/login" style={{ marginRight: '1rem' }}>Login</Link>
              <Link to="/register">Register</Link>
            </>
          ) : (
            <button onClick={logout} style={{ marginLeft: '1rem' }}>Logout</button>
          )}
        </nav>

        <Routes>
          <Route path="/" element={<PostList />} />
          <Route path="/posts/:id" element={<SinglePost />} />
          <Route
            path="/create"
            element={
              <ProtectedRoute>
                <PostForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/edit/:id"
            element={
              <ProtectedRoute>
                <PostForm />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
