import React, { useState } from 'react';
import { FormControl, InputLabel, Select, MenuItem, TextField } from '@mui/material';

const ArticleFilters = ({ setFilters }) => {
  const [sortBy, setSortBy] = useState('created_at');
  const [topic, setTopic] = useState('');

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
    setFilters((prevFilters) => ({ ...prevFilters, sortBy: e.target.value }));
  };

  const handleTopicKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      setFilters((prevFilters) => ({ ...prevFilters, topic }));
    }
  };

  const handleTopicChange = (e) => {
    setTopic(e.target.value);
  };

  return (
    <div className="article-filters">
      <FormControl fullWidth margin="normal">
        <InputLabel id="sort-by-label">Sort By</InputLabel>
        <Select
          labelId="sort-by-label"
          id="sort-by"
          value={sortBy}
          label="Sort By"
          onChange={handleSortChange}
        >
          <MenuItem value="created_at">Date</MenuItem>
          <MenuItem value="votes">Votes</MenuItem>
          <MenuItem value="comment_count">Comment Count</MenuItem>
          <MenuItem value="title">Title</MenuItem>
          <MenuItem value="topic">Topic</MenuItem>
          <MenuItem value="author">Author</MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth margin="normal">
        <TextField
          id="topic"
          label="Search for a Topic"
          value={topic}
          onChange={handleTopicChange}
          onKeyPress={handleTopicKeyPress}
        />
      </FormControl>
    </div>
  );
};

export default ArticleFilters;