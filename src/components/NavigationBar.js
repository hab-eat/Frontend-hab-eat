import React from 'react';
import './NavigationBar.css';
import { useNavigate } from 'react-router-dom';

const NavigationBar = ({ CarmeraElement }) => {
  const navigate = useNavigate();

  const onClickDiet = () => navigate('/nutrition');

  const onClickHabit = () => navigate('/habit');

  const onClickMyPage = () => navigate('/mypage');

  const onClickInquiry = () => {};

  return (
    <div className="navigation-bar">
      {/* 왼쪽 섹션: 식단, 습관 */}
      <div className="nav-left">
        <div className="nav-item" onClick={onClickDiet}>
          <img src="/nutrition-icon.png" alt="식단" className="nav-icon" />
          <span className="nav-label">식단</span>
        </div>
        <div className="nav-item" onClick={onClickHabit}>
          <img src="/habit-icon.png" alt="습관" className="nav-icon" />
          <span className="nav-label">습관</span>
        </div>
      </div>
      {CarmeraElement}
      {/* 오른쪽 섹션: 마이페이지 */}
      <div className="nav-right">
        <div className="nav-item" onClick={onClickMyPage}>
          <img src="/mypage-icon.png" alt="마이페이지" className="nav-icon" />
          <span className="nav-label">마이페이지</span>
        </div>
        <div className="nav-item">
          <img src="/contact-icon.png" alt="문의하기" className="nav-icon" />
          <span className="nav-label">문의</span>
        </div>
      </div>
    </div>
  );
};

export default NavigationBar;
