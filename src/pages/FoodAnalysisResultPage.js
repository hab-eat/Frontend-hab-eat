import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './FoodAnalysisResultPage.css';

const FoodAnalysisResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const foodName = location.state?.foodName || '';
  const comment = location.state?.comment || 'Hab-eat이 생각한 음식은..';

  useEffect(() => {
    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    const navigateWithDelay = async (ms, path) => {
      await sleep(ms);
      navigate(path, { state: { foodName } });
    };

    navigateWithDelay(1000, '/analysis/food-image/check');
  }, [navigate, foodName]);

  return (
    <div className="result-container">
      <h1 className="result-title">{comment}</h1>
      <h2 className="result-food-name">
        <span>{foodName}</span>입니다!
      </h2>
      <div className="result-image-container">
        <img
            src={'/folder.png'}        
          className="result-image"
        />
      </div>
    </div>
  );
};

export default FoodAnalysisResultPage;
