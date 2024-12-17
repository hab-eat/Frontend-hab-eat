import React from 'react';
import './FoodAnalysisResultPage.css';
import { useLocation } from 'react-router-dom';

const FoodAnalysisResultPage = () => {
  const location = useLocation();
  const foodName = location.state.foodName || '';
  const comment = location.state.comment || 'Hab-eat이 생각한 음식은..';

  return (
    <div className="result-container">
      <h1 className="result-title">{comment}</h1>
      <h2 className="result-food-name">
        <span>{foodName}</span>입니다!
      </h2>
      <div className="result-image-container">
        <img
          src={'/folder.png'}
          alt={`${foodName} 이미지`}
          className="result-image"
        />
      </div>
    </div>
  );
};

export default FoodAnalysisResultPage;
