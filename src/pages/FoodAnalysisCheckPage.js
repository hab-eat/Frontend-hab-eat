import React from 'react';
import './FoodAnalysisCheckPage.css'; // ResultSecond.js 재사용
import { useLocation, useNavigate } from 'react-router-dom';

const FoodAnalysisCheckPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const foodName = location.state?.foodName || '';
  const comment = location.state?.comment || 'Hab-eat이 생각한 음식은..';

  const onClickYesBtn = () => {
    // TODO: navigate to 자동 완성 페이지
  };

  const onClickNoBtn = () => {
    navigate('/analysis/food-image/retry', { state: { foodName } });
  };

  return (
    <div className="result-second-container">
      <div className="result-second-overlay"></div> {/* 어두운 레이어 */}
      <div className="result-second-content">
        <h1 className="result-second-title">{comment}</h1>
        <h2 className="result-second-food-name">
          <span>{foodName}</span>입니다!
        </h2>
        <div className="result-second-image-container">
          <img
            src={'/folder.png'}
            alt={`${foodName} 이미지`}
            className="result-second-image"
          />
        </div>
        <div className="result-second-buttons">
          <button className="result-second-button" onClick={onClickYesBtn}>
            맞아요
          </button>
          <div className="result-second-divider"></div>
          <button className="result-second-button" onClick={onClickNoBtn}>
            아니에요
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodAnalysisCheckPage;
