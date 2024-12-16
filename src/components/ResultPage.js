import React from 'react';
import { useLocation } from 'react-router-dom';

const ResultPage = () => {
  const location = useLocation();
  const { name } = location.state || {}; // 분석 결과 받기

  return (
    <div className="result-container">
      <h1>음식 판별 결과</h1>
      <p>판별된 음식: <strong>{name || '결과 없음'}</strong></p>
    </div>
  );
};

export default ResultPage;
