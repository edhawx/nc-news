import React from 'react';
import { Link } from 'react-router-dom';
import './articles.css';
import ArticleVote from './ArticleVote';

const ArticleCard = ({ article }) => {
  return (
    <article className="article-card">
      <h2>{article.title}</h2>
      <p>{article.body.slice(0, 200)}...</p>
      <p className="article-author">Author: {article.author}</p>
      <p className="article-date">Published: {new Date(article.created_at).toLocaleDateString()}</p>
      <ArticleVote articleId={article.article_id} initialVotes={article.votes} />
      <Link to={`/articles/${article.article_id}`} className="article-card-link">Read more</Link>
    </article>
  );
};

export default ArticleCard;