import React from 'react';

const TopicCard = ({topic})=>(
    <div>
        <h3>{topic.slug}</h3>
        <p>{topic.description}</p>
    </div>
);

export default TopicCard;