import React, { useState, useEffect } from 'react';
import { FormControl, InputLabel, Select, MenuItem, TextField } from '@mui/material';
import { useSearchParams, useNavigate } from 'react-router-dom';

const ArticleFilters = ({ setFilters }) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [sortBy, setSortBy] = useState(searchParams.get('sort_by') || 'created_at');
  const [order, setOrder] = useState(searchParams.get('order') || (sortBy === 'title' || sortBy === 'author' ? 'ASC' : 'DESC'));
  const [topic, setTopic] = useState('');

  useEffect(() => {
    const sortParam = searchParams.get('sort_by') || 'created_at';
    const orderParam = searchParams.get('order') || (sortParam === 'title' || sortParam === 'author' ? 'ASC' : 'DESC');
    setSortBy(sortParam);
    setOrder(orderParam);
  }, [searchParams]);

  const handleSortChange = (e) => {
    const newSortBy = e.target.value;
    const newOrder = newSortBy === 'title' || newSortBy === 'author' ? 'ASC' : 'DESC';
    setSortBy(newSortBy);
    setOrder(newOrder);
    setFilters({ sort_by: newSortBy, order: newOrder });
    navigate(`?sort_by=${newSortBy}&order=${newOrder}`);
  };

  const handleOrderChange = (e) => {
    setOrder(e.target.value);
    setFilters({ order: e.target.value });
    navigate(`?sort_by=${sortBy}&order=${e.target.value}`);
  };

  const handleTopicKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      setFilters({ topic });
      navigate(`/topics/${topic}`);
    }
  };

  const handleTopicChange = (e) => {
    setTopic(e.target.value);
  };

  return (
    <div className="article-filters">
      <FormControl fullWidth margin="normal" sx={{maxWidth:'400px', mr:'10px'}}>
        <TextField
          id="topic"
          label="Search for a Topic"
          value={topic}
          onChange={handleTopicChange}
          onKeyPress={handleTopicKeyPress}
        />
      </FormControl>
      <FormControl fullWidth margin="normal" sx={{maxWidth: '300px'}}>
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
      <FormControl fullWidth margin="normal" sx={{maxWidth: '100px', ml: '10px'}}>
        <InputLabel id="order-label">Order</InputLabel>
        <Select
          labelId="order-label"
          id="order"
          value={order}
          label="Order"
          onChange={handleOrderChange}
        >
          <MenuItem value="ASC">Ascending</MenuItem>
          <MenuItem value="DESC">Descending</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export default ArticleFilters;