import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getArticleById, getCommentsByArticleId } from '../../utils/api';
import CommentList from '../comments/CommentList';
import './articles.css';

const SingleArticle = () => {
  const { article_id } = useParams();
  const [article, setArticle] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    Promise.all([getArticleById(article_id), getCommentsByArticleId(article_id)])
      .then(([articleData, commentsData]) => {
        setArticle(articleData.article);
        setComments(commentsData.comments);
        setLoading(false);
      })
      .catch(err => {
        setError('Error fetching article or comments');
        setLoading(false);
      });
  }, [article_id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>{article.title}</h1>
      <p>{article.body}</p>
      <p>Author: {article.author}</p>
      <p>Published: {new Date(article.created_at).toLocaleDateString()}</p>
      <CommentList articleId={article.article_id} initialComments={comments} />
    </div>
  );
};

export default SingleArticle;