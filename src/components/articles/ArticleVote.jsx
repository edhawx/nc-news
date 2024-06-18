import React, { useState } from 'react';
import { ButtonGroup, Button, CircularProgress } from '@mui/material';
import { voteOnArticle } from '../../utils/api';
import './articles.css';
import { ThumbDownOffAlt, ThumbUpOffAlt } from '@mui/icons-material';

const ArticleVote = ({ articleId, initialVotes }) => {
  const [votes, setVotes] = useState(initialVotes);
  const [isVoting, setIsVoting] = useState(false);
  const [voteStatus, setVoteStatus] = useState('idle');

  const handleVote = (increment) => {
    setIsVoting(true);
    setVoteStatus('idle');
    setVotes((prevVotes) => prevVotes + increment);
    voteOnArticle(articleId, increment)
      .then(() => {
        setIsVoting(false);
        setVoteStatus('success');
        setTimeout(()=> setVoteStatus('idle'), 2000);
      })
      .catch((err) => {
        console.error('Error voting on article:', err);
        alert(`Vote failed. Error: `, {err})
        setVotes((prevVotes) => prevVotes - increment); 
        setIsVoting(false);
        setVoteStatus('error');
      });
  };

  return (
    <div className="vote-group">
      <p className="vote-p-tag">Votes: {votes}</p>
      <ButtonGroup variant="outlined" className="vote-button-group">
        <Button
          onClick={() => handleVote(1)}
          disabled={isVoting}
          style={{
            backgroundColor: voteStatus === 'success' ? 'green' : 'black',
            color: 'white',
            padding: '1px 8px',
            fontSize: '0.75rem'
          }}
        >
          {isVoting ? (
            <CircularProgress size={16} style={{ color: 'white' }} />
          ) : <ThumbUpOffAlt/>}
        </Button>
        <Button
          onClick={() => handleVote(-1)}
          disabled={isVoting}
          style={{
            backgroundColor: voteStatus === 'success' ? 'green' : 'black',
            color: 'white',
            padding: '4px 8px',
            fontSize: '0.75rem'
          }}
        >
          {isVoting ? (
            <CircularProgress size={16} style={{ color: 'white' }} />
          ) : <ThumbDownOffAlt/>}
        </Button>
      </ButtonGroup>
    </div>
  );
};

export default ArticleVote;