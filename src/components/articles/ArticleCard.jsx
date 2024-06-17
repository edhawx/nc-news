import React from 'react';
import { Link } from 'react-router-dom';
import './articles.css';

const ArticleCard = ({ article }) => {
  return (
    <div className="article-card">
      <h2>{article.title}</h2>
      <p>{article.body}</p>
      <p>Author: {article.author}</p>
      <p>Published: {new Date(article.created_at).toLocaleDateString()}</p>
      <p>Comments: {article.comment_count}</p>
      <Link to={`/articles/${article.article_id}`}>Read more</Link>
    </div>
  );
};

export default ArticleCard;