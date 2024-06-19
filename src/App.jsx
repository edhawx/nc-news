import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/header/Header';
import Nav from './components/nav/Nav';
import ArticlesList from './components/articles/ArticlesList';
import SingleArticle from './components/articles/SingleArticle';
import TopicsList from './components/topics/TopicsList';
import { getTopics } from './utils/api';
import './App.css';
import { Container } from '@mui/material';
import { UserProvider } from './contexts/UserContext.jsx';
import NotFound from './components/error/NotFound';

function App() {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    getTopics()
      .then(data => setTopics(data.topics))
      .catch(error => console.error('Error fetching topics', error));
  }, []);

  return (
    <UserProvider>
      <Router>
        <Container
          sx={{
            padding: '20px',
            '@media (max-width: 600px)': {
              maxWidth: '100%',
              padding: '10px',
            },
            '@media (min-width: 600px)': {
              maxWidth: '540px',
            },
            '@media (min-width: 960px)': {
              maxWidth: '720px',
            },
            '@media (min-width: 1280px)': {
              maxWidth: '960px',
            },
            '@media (min-width: 1920px)': {
              maxWidth: '1140px',
            },
          }}
        >
          <div className="App">
            <Header />
            <Nav />
            <main>
              <Routes>
                <Route path="/" element={<ArticlesList />} />
                <Route path="/topics/:topic" element={<ArticlesList />} />
                <Route path="/articles/:article_id" element={<SingleArticle />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
          </div>
        </Container>
      </Router>
    </UserProvider>
  );
}

export default App;