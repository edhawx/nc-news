import React, { useState } from "react";
import { postComment } from "../../utils/api";
import { Box, TextField, Button, Collapse, Typography, CircularProgress } from "@mui/material";
import { useUser } from '../../contexts/UserContext';
import ErrorComponent from '../error/ErrorComponent';
import './comments.css';

const CommentForm = ({ articleId, addComment }) => {
  const [username, setUsername] = useState('');
  const [body, setBody] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [open, setOpen] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState('idle');
  const { loggedInUser } = useUser();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    setSubmissionStatus('idle');

    if (!body.trim()) {
      setError("You haven't typed a comment");
      setIsSubmitting(false);
      setSubmissionStatus('error');
      return;
    }

    postComment(articleId, { username: loggedInUser || username, body })
      .then((comment) => {
        addComment(comment);
        setUsername('');
        setBody('');
        setIsSubmitting(false);
        setSubmissionStatus('success');

        setTimeout(() => setSubmissionStatus('idle'), 2000);
      })
      .catch((err) => {
        console.error('Error whilst posting comment:', err);
        const errorMessage = err.response?.data?.msg || 'An error occurred whilst posting the comment';
        setError(errorMessage);
        setIsSubmitting(false);
        setSubmissionStatus('error');
      });
  };

  return (
    <Box>
      <Typography
        variant="body1"
        className="comment-toggle"
        color="primary"
        onClick={() => setOpen(!open)}
        style={{ cursor: 'pointer', marginBottom: '10px' }}
      >
        Comment
      </Typography>
      <Collapse in={open}>
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { mb: 0, ml: '10px', mr: '10px' },
            '& .MuiButton-root': { mt: 0 }, 
          }}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
          className="comment-form"
        >
          {loggedInUser ? (
            <Typography variant="body2" sx={{ m: 1 }}>
              Commenting as {loggedInUser}
            </Typography>
          ) : (
            <TextField
              required
              id="username"
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              fullWidth
              sx={{ marginBottom: '16px', marginLeft: '-10px' }} 
            />
          )}
          
          <Box sx={{ mt: '-10px', marginBottom: '16px', marginLeft: '-10px', marginRight: '10px' }}>
          <TextField
            required
            id="comment"
            label="Comment"
            className="comment-field-form"
            multiline
            rows={4}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            fullWidth
            
          />
          </Box>

          <Button
            type="submit"
            variant="contained"
            color={submissionStatus === 'success' ? 'success' : 'primary'}
            disabled={isSubmitting}
            sx={{ mt: 2 , width: '150px'}}
          >
            {submissionStatus === 'success' ? 'Success!' : (isSubmitting ? <CircularProgress size={24} style={{ color: 'white' }} /> : 'Post Comment')}
          </Button>
          {error && <ErrorComponent message={error} />}
        </Box>
      </Collapse>
    </Box>
  );
};

export default CommentForm;