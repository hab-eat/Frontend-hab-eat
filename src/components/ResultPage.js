import React from 'react';
import './ResultPage.css';

const ResultPage = ({ foodName, imageUrl,comment }) => {
  return (
    <div className="result-container">
      <h1 className="result-title">{comment}</h1>
      <h2 className="result-food-name">
        <span>{foodName}</span>입니다!
      </h2>
      <div className="result-image-container">
        <img src={"/folder.png"} alt={`${foodName} 이미지`} className="result-image" />
      </div>
    </div>
  );
};

export default ResultPage;