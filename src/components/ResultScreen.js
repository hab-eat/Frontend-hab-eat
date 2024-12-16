import React from 'react';
import './ResultScreen.css';

const ResultScreen = ({ result }) => {
  return (
    <div className="result-container">
      <h1>음식 판별 결과</h1>
      <p>판별된 음식: <strong>{result}</strong></p>
    </div>
  );
};

export default ResultScreen;
