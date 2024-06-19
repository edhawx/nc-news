import React from 'react';

const ErrorComponent = ({ message }) => {
  return (
    <div className="error-container">
      <h2>Error</h2>
      <p>{message}</p>
    </div>
  );
};

export default ErrorComponent;