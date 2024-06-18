import React, { useState } from 'react';
import { ButtonGroup } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { voteOnArticle } from '../../utils/api';
import './articles.css';

const ArticleVote = ({ articleId, initialVotes }) => {
  const [votes, setVotes] = useState(initialVotes);
  const [isVoting, setIsVoting] = useState(false);

  const handleVote = (increment) => {
    setIsVoting(true);
    setVotes((prevVotes) => prevVotes + increment);
    voteOnArticle(articleId, increment)
      .then(() => {
        setIsVoting(false);
      })
      .catch((err) => {
        console.error('Error voting on article:', err);
        alert(`Vote failed. Error: `, {err})
        setVotes((prevVotes) => prevVotes - increment); 
        setIsVoting(false);
      });
  };

  return (
    <div className="vote-group">
      <p className="vote-p-tag">Votes: {votes}</p>
      <ButtonGroup variant="outlined" className="vote-button-group" size='small'>
        <LoadingButton
          onClick={() => handleVote(1)}
          loading={isVoting}
          disabled={isVoting}
        >
          Upvote
        </LoadingButton>
        <LoadingButton
          onClick={() => handleVote(-1)}
          loading={isVoting}
          disabled={isVoting}
        >
          Downvote
        </LoadingButton>
      </ButtonGroup>
    </div>
  );
};

export default ArticleVote;