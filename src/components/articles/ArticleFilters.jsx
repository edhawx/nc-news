import React, { useState, useEffect } from 'react';
import { FormControl, InputLabel, Select, MenuItem, TextField } from '@mui/material';
import { useSearchParams, useNavigate } from 'react-router-dom';
import './articles.css'

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
    setFilters((prevFilters) => ({ ...prevFilters, sort_by: newSortBy, order: newOrder }));
    navigate(`?sort_by=${newSortBy}&order=${newOrder}`);
  };

  const handleOrderChange = (e) => {
    const newOrder = e.target.value;
    setOrder(newOrder);
    setFilters((prevFilters) => ({ ...prevFilters, order: newOrder }));
    navigate(`?sort_by=${sortBy}&order=${newOrder}`);
  };

  const handleTopicKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      setFilters((prevFilters) => ({ ...prevFilters, topic }));
      navigate(`/topics/${topic}`);
    }
  };

  const handleTopicChange = (e) => {
    setTopic(e.target.value);
  };

  return (
    <div>
      <FormControl fullWidth margin="normal" sx={{ maxWidth: '400px', mr: '10px' }}>
        <TextField
          id="topic"
          label="Search for a Topic"
          value={topic}
          onChange={handleTopicChange}
          onKeyUp={handleTopicKeyPress}
          sx={{
            '& .MuiInputBase-root': {
              color: 'var(--text-primary)',
              backgroundColor: 'var(--background-paper)',
            },
            '& .MuiInputLabel-root': {
              color: 'var(--text-primary)',
            },
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: 'var(--border-color)',
              },
              '&:hover fieldset': {
                borderColor: 'var(--border-color-hover)',
              },
              '&.Mui-focused fieldset': {
                borderColor: 'var(--border-color-active)',
              },
            },
          }}
        />
      </FormControl>
      <FormControl fullWidth margin="normal" sx={{ maxWidth: '300px' }}>
        <InputLabel id="sort-by-label" sx={{ color: 'var(--text-primary)' }}>Sort By</InputLabel>
        <Select
          labelId="sort-by-label"
          id="sort-by"
          value={sortBy}
          label="Sort By"
          onChange={handleSortChange}
          sx={{
            '& .MuiSelect-select': {
              color: 'var(--text-primary)',
              backgroundColor: 'var(--background-paper)',
            },
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: 'var(--border-color)',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: 'var(--border-color-hover)',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: 'var(--border-color-active)',
            },
          }}
        >
          <MenuItem value="created_at">Date</MenuItem>
          <MenuItem value="votes">Votes</MenuItem>
          <MenuItem value="comment_count">Comment Count</MenuItem>
          <MenuItem value="title">Title</MenuItem>
          <MenuItem value="topic">Topic</MenuItem>
          <MenuItem value="author">Author</MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth margin="normal" sx={{ maxWidth: '100px', ml: '10px' }}>
        <InputLabel id="order-label" sx={{ color: 'var(--text-primary)' }}>Order</InputLabel>
        <Select
          labelId="order-label"
          id="order"
          value={order}
          label="Order"
          onChange={handleOrderChange}
          sx={{
            '& .MuiSelect-select': {
              color: 'var(--text-primary)',
              backgroundColor: 'var(--background-paper)',
            },
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: 'var(--border-color)',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: 'var(--border-color-hover)',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: 'var(--border-color-active)',
            },
          }}
        >
          <MenuItem value="ASC">Ascending</MenuItem>
          <MenuItem value="DESC">Descending</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export default ArticleFilters;