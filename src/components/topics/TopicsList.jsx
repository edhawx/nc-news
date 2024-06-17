import React from 'react';

const TopicsList = ({ topics }) => (
  <div>
    <h2>Topics</h2>
    {topics.map(topic => (
      <div key={topic.slug}>
        <h3>{topic.slug}</h3>
        <p>{topic.description}</p>
      </div>
    ))}
  </div>
);

export default TopicsList;