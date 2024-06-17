import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/header/Header';
import Nav from './components/nav/Nav';
import ArticlesList from './components/articles/ArticlesList';
import TopicsList from './components/topics/TopicsList';
import { getTopics } from './utils/api';
import './App.css';

function App() {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    getTopics()
      .then(data => setTopics(data.topics))
      .catch(error => console.error('Error fetching topics', error));
  }, []);

  return (
    <Router>
      <div className="App">
      <Header />
      <Nav />
      <main>
        <Routes>
          <Route path="/" element={<ArticlesList />} />
          <Route path="/topics/:topic" element={<ArticlesList />} />
        </Routes>
      </main>
      </div>
    </Router>
  );
}

export default App;