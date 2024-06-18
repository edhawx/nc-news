import React, { useState } from "react";
import CommentCard from "./CommentCard";
import CommentForm from "./CommentForm";
import './comments.css';

const CommentList = ({ articleId, initialComments }) => {
  const [comments, setComments] = useState(initialComments);

  const addComment = (comment) => {
    setComments((prevComments) => [comment, ...prevComments]);
  };

  return (
    <div>
      <h4 className="comments-title">Comments</h4>
      <CommentForm articleId={articleId} addComment={addComment} />
      {comments.length === 0 ? (
        <p>No comments yet</p>
      ) : (
        comments.map(comment => (
          <CommentCard key={comment.comment_id} comment={comment} />
        ))
      )}
    </div>
  );
};

export default CommentList;