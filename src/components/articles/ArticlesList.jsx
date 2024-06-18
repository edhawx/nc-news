import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { getArticles } from '../../utils/api';
import ArticleCard from './ArticleCard';
import ArticleFilters from './ArticleFilters';
import { CircularProgress, Box } from '@mui/material';

const ArticlesList = () => {
  const { topic } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const sortBy = searchParams.get('sort_by') || 'created_at';
  const order = searchParams.get('order') || 'DESC';
  const page = parseInt(searchParams.get('p')) || 1;

  const setFilters = (newFilters) => {
    const newSearchParams = new URLSearchParams(searchParams);
    Object.keys(newFilters).forEach(key => {
      newSearchParams.set(key, newFilters[key]);
    });
    setSearchParams(newSearchParams);
  };

  useEffect(() => {
    setLoading(true);
    getArticles(sortBy, topic, page, order)
      .then(data => {
        setArticles(data.articles);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching articles: ', error);
        setError('Error fetching articles');
        setLoading(false);
      });
  }, [sortBy, topic, page, order]);

  if (loading) return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <CircularProgress />
    </Box>
  );
  if (error) return <p>{error}</p>;

  return (
    <section>
      <ArticleFilters setFilters={setFilters} />
      {articles.map(article => (
        <ArticleCard key={article.article_id} article={article} />
      ))}
    </section>
  );
};

export default ArticlesList;