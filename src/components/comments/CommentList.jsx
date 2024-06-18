import React, { useState, useEffect } from "react";
import CommentCard from "./CommentCard";
import CommentForm from "./CommentForm";
import { getCommentsByArticleId } from "../../utils/api";
import './comments.css';
import { useUser } from '../../contexts/UserContext';
import { CircularProgress, Box } from "@mui/material";

const CommentList = ({ articleId }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { loggedInUser } = useUser();

  useEffect(() => {
    getCommentsByArticleId(articleId)
      .then(commentsData => {
        setComments(commentsData.comments);
        setLoading(false);
      })
      .catch(err => {
        setError('Error fetching comments');
        setLoading(false);
      });
  }, [articleId]);

  const addComment = (comment) => {
    setComments((prevComments) => [comment, ...prevComments]);
  };

  const removeComment = (commentId) => {
    setComments((prevComments) => prevComments.filter(comment => comment.comment_id !== commentId));
  };

  if (loading) return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <CircularProgress />
    </Box>
  );;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h4 className="comments-title">Comments</h4>
      <CommentForm articleId={articleId} addComment={addComment} />
      {comments.length === 0 ? (
        <p>No comments yet</p>
      ) : (
        comments.map(comment => (
          <CommentCard 
            key={comment.comment_id} 
            comment={comment} 
            loggedInUser={loggedInUser}
            removeComment={removeComment} 
          />
        ))
      )}
    </div>
  );
};

export default CommentList;
