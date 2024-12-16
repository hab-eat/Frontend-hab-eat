import React from 'react';
import './ResultSecond.css'; // 동일한 스타일 재사용

const ResultThird = ({ foodName, imageUrl, comment }) => {
  return (
    <div className="result-second-container">
      <div className="result-second-overlay"></div> {/* 어두운 레이어 */}
      <div className="result-second-content">
        <h1 className="result-second-title">{comment}</h1>
        <h2 className="result-second-food-name">
          <span>{foodName}</span>입니다!
        </h2>
        <div className="result-second-image-container">
          <img src={"/folder.png"} alt={`${foodName} 이미지`} className="result-second-image" />
        </div>
        <div className="result-second-buttons">
          <button className="result-second-button">다시 촬영</button>
          <div className="result-second-divider"></div>
          <button className="result-second-button">직접 입력</button>
        </div>
      </div>
    </div>
  );
};

export default ResultThird;
