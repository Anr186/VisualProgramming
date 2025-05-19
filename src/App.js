import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Author/Navbar';
import Profile from './pages/Profile';
import ReviewArticles from './pages/ReviewArticles';
import SubmitArticle from './pages/SubmitArticle';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/profile" element={<Profile />} />
          <Route path="/articles" element={<ReviewArticles />} />
          <Route path="/submit" element={<SubmitArticle />} />
          <Route path="/" element={<Profile/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;