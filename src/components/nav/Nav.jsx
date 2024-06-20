import React, { useEffect, useState } from 'react';
import { getLinks } from '../../utils/api';
import { Link } from 'react-router-dom';
import './nav.css';

const Nav = () => {
  const [topics, setTopics] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    getLinks()
      .then(({ topics }) => {
        setTopics(topics);
      })
      .catch(error => console.error('Error fetching topics:', error));
  }, []);

  const formatTopicName = (slug) => {
    return slug.charAt(0).toUpperCase() + slug.slice(1).toLowerCase();
  };

  const toggleTheme = () => {
    setDarkMode(prevMode => !prevMode);
    document.body.classList.toggle('dark-mode');
  };

  return (
    <nav className="NavBar">
      <Link to="/" className="nav-link">Home</Link>
      {topics.map((topic) => (
        <Link key={topic.slug} to={`/topics/${topic.slug.toLowerCase()}`} className="nav-link">
          {formatTopicName(topic.slug)}
        </Link>
      ))}
      <button onClick={toggleTheme} className="toggle-theme-button">
        {darkMode ? 'Light Mode' : 'Dark Mode'}
      </button>
    </nav>
  );
};

export default Nav;