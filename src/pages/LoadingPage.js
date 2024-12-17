import React from 'react';
import './LoadingPage.css';

const LoadingPage = () => {
  return (
    <div className="loading-container">
      <h1 className="loading-title">Hab-eat</h1>
      <p className="loading-subtitle">분석중이예요</p>
      <div className="loading-dots">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
};

export default LoadingPage;
