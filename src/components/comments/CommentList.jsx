import React from "react";
import CommentCard from "./CommentCard";
import './comments.css';

const CommentList = ({ comments }) => {
  return (
    <div className="comment-container">
      <h4 className="comments-title">Comments</h4>
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