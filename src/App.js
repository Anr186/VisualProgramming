import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import CommentsApp from './components/Comments';
import PostsApp from './components/Posts';
import AlbumsApp from './components/Albums';
import TodosApp from './components/Todos';
import UsersApp from './components/Users';
// import Upgrade from './components/Upgrade';

const App = () => {
  const [activeButton, setActiveButton] = useState(null);

  const menuItems = [
    { path: "/posts", name: "Posts", color: "#4CAF50" },
    { path: "/albums", name: "Albums", color: "#2196F3" },
    { path: "/todos", name: "Todos", color: "#FF9800" },
    { path: "/users", name: "Users", color: "#9C27B0" },
    { path: "/comments", name: "Comments", color: "#ed6bcd" },
    // { path: "/upgrade", name: "Pashalka", color: "#FF5722" }
  ];

  const handleButtonClick = (path) => {
    setActiveButton(path);
    setTimeout(() => setActiveButton(null), 300);
  };

  return (
    <Router>
      <div style={{ display: 'flex' }}>
        {/* Навигационная панель */}
        <div style={{
          width: '250px',
          backgroundColor: '#2c3e50',
          padding: '30px 20px',
          minHeight: '100vh',
          boxShadow: '2px 0 10px rgba(0,0,0,0.2)',
          position: 'sticky',
          top: 0
        }}>
          <h2 style={{ 
            textAlign: 'center', 
            marginBottom: '30px',
            color: 'white',
            fontSize: '24px',
            fontWeight: '600',
            letterSpacing: '1px'
          }}>
            Menu
          </h2>
          <nav>
            <ul style={{ 
              listStyle: 'none', 
              padding: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: '10px'
            }}>
              {menuItems.map((item) => (
                <li key={item.path}>
                  <Link 
                    to={item.path} 
                    style={{
                      display: 'block',
                      textDecoration: 'none',
                      color: 'white',
                      fontWeight: '500',
                      fontSize: '16px',
                      padding: '12px 20px',
                      borderRadius: '8px',
                      transition: 'all 0.3s ease',
                      backgroundColor: activeButton === item.path 
                        ? item.color 
                        : 'rgba(255, 255, 255, 0.1)',
                      borderLeft: `4px solid ${item.color}`,
                      transform: activeButton === item.path 
                        ? 'scale(0.98)' 
                        : 'none',
                      boxShadow: activeButton === item.path
                        ? `0 0 10px ${item.color}`
                        : 'none',
                      ':hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                        transform: 'translateX(5px)'
                      }
                    }}
                    activeStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.2)',
                      fontWeight: '600'
                    }}
                    onClick={() => handleButtonClick(item.path)}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div style={{
            marginTop: '40px',
            color: 'rgba(255, 255, 255, 0.7)',
            fontSize: '14px',
            textAlign: 'center',
            paddingTop: '20px',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            Created by Katya Vlasova
          </div>
        </div>

        <div style={{ 
          flex: 1, 
          padding: '30px',
          backgroundColor: '#f5f7fa'
        }}>
          <Routes>
            <Route path="/posts" element={<PostsApp />} />
            <Route path="/albums" element={<AlbumsApp />} />
            <Route path="/todos" element={<TodosApp />} />
            <Route path="/users" element={<UsersApp />} />
            <Route path="/comments" element={<CommentsApp />} />
            {/* <Route path="/upgrade" element={<Upgrade />} /> */}
            <Route path="/" element={<PostsApp />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;