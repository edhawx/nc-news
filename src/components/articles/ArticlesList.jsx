import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getArticles } from '../../utils/api';
import ArticleCard from './ArticleCard';
import ArticleFilters from './ArticleFilters';
import Pagination from '@mui/material/Pagination';
import { Typography, CircularProgress, Box } from '@mui/material';

const ArticlesList = () => {
  const { topic } = useParams();
  const [articles, setArticles] = useState([]);
  const [filters, setFilters] = useState({ sortBy: 'created_at', topic: topic || '' });
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setFilters(prevFilters => ({ ...prevFilters, topic: topic || '' }));
  }, [topic]);

  useEffect(() => {
    setLoading(true);
    getArticles(filters.sortBy, filters.topic, page)
      .then(data => {
        setArticles(data.articles);
        setTotalPages(Math.ceil(data.total_count / 10)); 
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching articles: ', error);
        setError('Error fetching articles');
        setLoading(false);
      });
  }, [filters, page]);

  const handleChange = (event, value) => {
    setPage(value);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <section>
      <ArticleFilters setFilters={setFilters} />
      {articles.map(article => (
        <ArticleCard key={article.article_id} article={article} />
      ))}
      <Typography>Page: {page}</Typography>
      <Pagination count={totalPages} page={page} onChange={handleChange} />
    </section>
  );
};

export default ArticlesList;