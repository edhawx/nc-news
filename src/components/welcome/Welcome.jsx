import React from 'react';
import './welcome.css';

const Welcome = () => (
  <header className="welcome">
    <h2>Welcome to Our News and Articles Hub!</h2>
    <p>Discover a world of diverse and engaging content right here! Our platform brings you a wide range of articles on various topics, from technology and science to lifestyle and culture. Whether you're here to stay informed, learn something new, or just enjoy some interesting reads, we've got you covered.</p>
    <h3>What You Can Do Here</h3>
    <ul>
      <li>Explore Articles: Dive into articles spanning different subjects. There's always something new and intriguing to read.</li>
      <li>Join the Conversation: Share your thoughts by commenting on articles. Engage with other readers and contribute to lively discussions.</li>
      <li>Upvote and Downvote: Let your voice be heard! Vote on articles to help others find the best content.</li>
      <li>Personalize Your Experience: Use the search bar to find articles on topics that interest you the most. Customize your reading experience.</li>
    </ul>
  </header>
);

export default Welcome;