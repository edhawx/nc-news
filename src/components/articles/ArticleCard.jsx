import React from 'react';
import { Link } from 'react-router-dom';
import './articles.css';
import ArticleVote from './ArticleVote';

const ArticleCard = ({ article }) => {
  return (
    <article className="article-card">
      <h2>{article.title}</h2>
      <div className="article-card-content">
        <img src={article.article_img_url} alt={article.title} className="article-image" />
        <div className="article-details">
          <p className="article-body">{article.body.slice(0, 200)}...</p>
          <p className="article-author">Author: {article.author}</p>
          <p className="article-date">Published: {new Date(article.created_at).toLocaleDateString()}</p>
          <p className="article-comment-count">Comments: {article.comment_count}</p>
          <ArticleVote articleId={article.article_id} initialVotes={article.votes} />
          <Link to={`/articles/${article.article_id}`} className="article-card-link">Read more</Link>
        </div>
      </div>
    </article>
  );
};

export default ArticleCard;