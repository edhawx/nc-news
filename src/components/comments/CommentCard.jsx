import React, { useState } from "react";
import { CircularProgress, Button } from "@mui/material";
import { deleteComment } from "../../utils/api";
import { useUser } from '../../contexts/UserContext';
import './comments.css';

const CommentCard = ({ comment, removeComment }) => {
  const { loggedInUser } = useUser();
  const [isDeleting, setIsDeleting] = useState(false);
  const [deletionStatus, setDeletionStatus] = useState(null);

  const handleDelete = () => {
    setIsDeleting(true);
    deleteComment(comment.comment_id)
      .then(() => {
        setDeletionStatus('success');
        setTimeout(() => {
          setIsDeleting(false);
          removeComment(comment.comment_id);
        }, 1000); 
      })
      .catch((err) => {
        console.error('Error deleting comment:', err);
        setIsDeleting(false);
        setDeletionStatus('error');
      });
  };

  return (
    <section className="comments-section" key={comment.comment_id}>
      <p className="comment-body">{comment.body}</p>
      <p className="comment-author">Author: {comment.author}</p>
      <p className="comment-date">Published: {new Date(comment.created_at).toLocaleDateString()}</p>
      {loggedInUser === comment.author && (
        <>
          <Button
            variant="contained"
            onClick={handleDelete}
            disabled={isDeleting}
            className={`delete-button ${deletionStatus}`}
            style={{ 
              backgroundColor: deletionStatus === 'success' ? 'green' : 'black',
              color: 'white',
              padding: '4px 8px',
              fontSize: '0.75rem' 
            }}
          >
            {isDeleting ? (
              <CircularProgress size={24} style={{ color: 'white' }} />
            ) : deletionStatus === 'success' ? (
              'Success!'
            ) : (
              'Delete'
            )}
          </Button>
          {deletionStatus === 'error' && (
            <p className="deletion-error">Error deleting comment</p>
          )}
        </>
      )}
    </section>
  );
};

export default CommentCard;