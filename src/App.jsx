import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useParams } from 'react-router-dom';
import Header from './components/header/Header';
import Nav from './components/nav/Nav';
import ArticlesList from './components/articles/ArticlesList';
import SingleArticle from './components/articles/SingleArticle';
import { getTopics } from './utils/api';
import './App.css';
import { Container } from '@mui/material';
import { UserProvider } from './contexts/UserContext.jsx';

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
                <Route path="/topics/:topic" element={<TopicWrapper />} />
                <Route path="/articles/:article_id" element={<SingleArticle />} />
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </main>
          </div>
        </Container>
      </Router>
    </UserProvider>
  );
}

const TopicWrapper = () => {
  const { topic } = useParams();
  const normalizedTopic = topic.toLowerCase();
  if (topic !== normalizedTopic) {
    return <Navigate to={`/topics/${normalizedTopic}`} />;
  }

  return <ArticlesList />;
};

export default App;