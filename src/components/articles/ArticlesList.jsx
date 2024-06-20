import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getArticles, getTopics } from '../../utils/api';
import ArticleCard from './ArticleCard';
import ArticleFilters from './ArticleFilters';
import Pagination from '@mui/material/Pagination';
import { Typography, CircularProgress, Box } from '@mui/material';
import ErrorComponent from '../error/ErrorComponent';
import './articles.css';

const ArticlesList = () => {
  const { topic } = useParams();
  const [articles, setArticles] = useState([]);
  const [filters, setFilters] = useState({ sort_by: 'created_at', topic: topic || '', order: 'DESC' });
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const clearError = ()=>{
    setError(null);
  };

  useEffect(() => {
    setLoading(true);
    clearError();
    getTopics()
      .then((topicsData) => {
        const topics = topicsData.topics.map(t => t.slug);
        if (topic && !topics.includes(topic)) {
          setError('Topic not found');
          setLoading(false);
          return Promise.reject('Topic not found');
        } else {
          return getArticles(filters.sort_by, topic || '', page, filters.order);
        }
      })
      .then((articlesData) => {
        setArticles(articlesData.articles);
        setTotalPages(Math.ceil(articlesData.total_count / 10));
        setLoading(false);
      })
      .catch((err) => {
        if (err !== 'Topic not found') {
          console.error('Error fetching articles:', err);
          setError('Error fetching articles');
        }
        setLoading(false);
      });
  }, [filters, page, topic]);

  const handleChange = (event, value) => {
    setPage(value);
  };

  if (loading) return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <CircularProgress />
    </Box>
  );

  if (error) return <ErrorComponent message={error} />;

  return (
    <section>
      <ArticleFilters setFilters={setFilters} />
      {articles.map(article => (
        <ArticleCard key={article.article_id} article={article} />
      ))}
      <Typography>Page: {page}</Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
      <Pagination count={totalPages} page={page} onChange={handleChange} />
      </Box>
    </section>
  );
};

export default ArticlesList;
