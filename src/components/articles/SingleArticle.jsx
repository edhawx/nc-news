import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getArticleById } from '../../utils/api';
import CommentList from '../comments/CommentList';
import { CircularProgress, Box } from '@mui/material';
import ErrorComponent from '../error/ErrorComponent';
import ArticleVote from './ArticleVote';
import './articles.css';

const SingleArticle = () => {
  const { article_id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getArticleById(article_id)
      .then(articleData => {
        setArticle(articleData.article);
        setLoading(false);
      })
      .catch(err => {
        setError('Cannot find that article');
        setLoading(false);
      });
  }, [article_id]);

  if (loading) return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <CircularProgress />
    </Box>
  );

  if (error) return <ErrorComponent message={error} />;

  return (
    <div className="single-article">
      <h1 className="single-article-title">{article.title}</h1>
      <img src={article.article_img_url} alt={article.title} className="single-article-image" />
      <p className="single-article-body">{article.body}</p>
      <div className="single-article-details">
        <p className="article-author">Author: {article.author}</p>
        <p className="article-date">Published: {new Date(article.created_at).toLocaleDateString()}</p>
        <ArticleVote articleId={article.article_id} initialVotes={article.votes} />
      </div>
      <CommentList articleId={article.article_id} />
    </div>
  );
};

export default SingleArticle;