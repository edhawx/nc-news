import React, { useEffect, useState } from 'react';
import { getLinks } from '../../utils/api';
import { Link } from 'react-router-dom';

const Nav = () => {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    getLinks()
      .then(({ topics }) => {
        setTopics(topics);
      })
      .catch(error => console.error('Error fetching topics:', error));
  }, []);

  const formatTopicName = (slug)=>{
    return slug.charAt(0).toUpperCase() + slug.slice(1).toLowerCase();
  }

  return (
    <nav className="NavBar">
      <Link to="/" className="nav-link">Home</Link>
      {topics.map((topic) => (
        <Link key={topic.slug} to={`/topics/${topic.slug}`} className="nav-link">
          {formatTopicName(topic.slug)}
        </Link>
      ))}
    </nav>
  );
};

export default Nav;