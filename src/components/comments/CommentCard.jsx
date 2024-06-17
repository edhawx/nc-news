import React from "react";
import './comments.css';

const CommentCard = ({ comment }) => {
  return (
    <section className="comments-section" key={comment.comment_id}>
      <p className="comment-body">{comment.body}</p>
      <p className="comment-author">Author: {comment.author}</p>
      <p className="comment-date">Published: {new Date(comment.created_at).toLocaleDateString()}</p>
    </section>
  );
};

export default CommentCard;