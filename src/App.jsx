import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/header/Header';
import Welcome from './components/welcome/Welcome.jsx';
import Nav from './components/nav/Nav';
import ArticlesList from './components/articles/ArticlesList';
import SingleArticle from './components/articles/SingleArticle';
import { getTopics } from './utils/api';
import './App.css';
import { Container, CssBaseline } from '@mui/material';
import { UserProvider } from './contexts/UserContext.jsx';
import NotFound from './components/error/NotFound';
import ThemeContextProvider from './contexts/ThemeContext.jsx';

function App() {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    getTopics()
      .then((data) => setTopics(data.topics))
      .catch((error) => console.error('Error fetching topics', error));
  }, []);

  return (
    <UserProvider>
      <ThemeContextProvider>
        <Router>
          <Container
            sx={{
              padding: '20px',
              '@media (max-width: 480px)': {
                maxWidth: '90%',
                padding: '8px',
              },
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
            <CssBaseline />
            <div className="App">
              <Header />
              <Nav />
              <main>
                <Routes>
                  <Route path="/" element={
                    <>
                      <Welcome />
                      <ArticlesList />
                    </>
                  } />
                  <Route path="/topics/:topic" element={<ArticlesList />} />
                  <Route path="/articles/:article_id" element={<SingleArticle />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
            </div>
          </Container>
        </Router>
      </ThemeContextProvider>
    </UserProvider>
  );
}

export default App;