// 마이페이지, 설정 목록(아이템) 공통 컴포넌트
import React from 'react';
// import "./MyPage.css";

import '../MyPage.css';

const MyPageItem = ({ icon, text, onClick }) => {
  return (
    <div className="mypage-item" onClick={onClick}>
      <img src={icon} alt={`${text} icon`} className="mypage-item-icon" />
      <span className="mypage-item-text">{text}</span>
    </div>
  );
};

export default MyPageItem;
