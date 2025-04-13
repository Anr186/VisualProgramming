import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import CommentsApp from './components/Comments';
import PostsApp from './components/Posts';
import AlbumsApp from './components/Albums';
import TodosApp from './components/Todos';
import UsersApp from './components/Users';

const App = () => {
  return (
    <Router>
      <div style={{ display: 'flex' }}>
        {/* Навигационная панель */}
        <div style={{
          width: '200px',
          backgroundColor: '#f0f0f0',
          padding: '20px',
          minHeight: '100vh',
          boxShadow: '2px 0 5px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Menu</h2>
          <nav>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li style={{ marginBottom: '10px' }}>
                <Link 
                  to="/posts" 
                  style={{ 
                    textDecoration: 'none', 
                    color: '#4CAF50',
                    fontWeight: 'bold'
                  }}
                >
                  Posts
                </Link>
              </li>
              <li style={{ marginBottom: '10px' }}>
                <Link 
                  to="/albums" 
                  style={{ 
                    textDecoration: 'none', 
                    color: '#2196F3',
                    fontWeight: 'bold'
                  }}
                >
                  Albums
                </Link>
              </li>
              <li style={{ marginBottom: '10px' }}>
                <Link 
                  to="/todos" 
                  style={{ 
                    textDecoration: 'none', 
                    color: '#FF9800',
                    fontWeight: 'bold'
                  }}
                >
                  Todos
                </Link>
              </li>
              <li style={{ marginBottom: '10px' }}>
                <Link 
                  to="/users" 
                  style={{ 
                    textDecoration: 'none', 
                    color: '#9C27B0',
                    fontWeight: 'bold'
                  }}
                >
                  Users
                </Link>
              </li>
              <li style={{ marginBottom: '10px' }}>
                <Link 
                  to="/comments" 
                  style={{ 
                    textDecoration: 'none', 
                    color: '#ed6bcd',
                    fontWeight: 'bold'
                  }}
                >
                  Comments
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <div style={{ flex: 1, padding: '20px' }}>
          <Routes>
            <Route path="/posts" element={<PostsApp />} />
            <Route path="/albums" element={<AlbumsApp />} />
            <Route path="/todos" element={<TodosApp />} />
            <Route path="/users" element={<UsersApp />} />
            <Route path="/comments" element={<CommentsApp />} />
            <Route path="/" element={<PostsApp />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;