import React, { useState } from "react";
import { postComment } from "../../utils/api";
import { Box, TextField, Button, Collapse, Typography } from "@mui/material";
import './comments.css';

const CommentForm = ({ articleId, addComment }) => {
  const [username, setUsername] = useState('');
  const [body, setBody] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [open, setOpen] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState('idle'); 

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    setSubmissionStatus('idle'); 

    postComment(articleId, { username, body })
      .then((comment) => {
        addComment(comment);
        setUsername('');
        setBody('');
        setIsSubmitting(false);
        setSubmissionStatus('success');

        setTimeout(() => setSubmissionStatus('idle'), 2000);
      })
      .catch((err) => {
        console.error(`Error whilst posting comment: `, err);
        const errorMessage = err.response?.data?.msg || 'An error occurred whilst posting comment';
        setError(errorMessage);
        setIsSubmitting(false);
        setSubmissionStatus('error');
      });
  };

  return (
    <Box>
      <Typography
        variant="body1"
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
            '& .MuiTextField-root': { m: 1 },
          }}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
          className="comment-form"
        >
          <TextField
            required
            id="username"
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            fullWidth
          />
          <TextField
            required
            id="comment"
            label="Comment"
            multiline
            rows={4}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            fullWidth
          />
          <Button
            type="submit"
            variant="contained"
            color={submissionStatus === 'success' ? 'success' : 'primary'}
            disabled={isSubmitting}
            sx={{ mt: 2 }}
          >
            {submissionStatus === 'success' ? 'Success!' : (isSubmitting ? 'Posting comment...' : 'Post Comment')}
          </Button>
          {error && <p className="error">{error}</p>}
        </Box>
      </Collapse>
    </Box>
  );
};

export default CommentForm;