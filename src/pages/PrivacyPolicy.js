// 개인정보 처리 방침 페이지
import React from "react";
import { useNavigate } from "react-router-dom";
import back from "../img/back.svg";  // 뒤로가기 아이콘

const PrivacyPolicy = () => {
  const navigate = useNavigate();
  return (
    <div className="div">
      <div className="settings-header">
          <img
            className="settings-back-icon"
            alt="Back"
            src={back}
            onClick={() => navigate(-1)} // 뒤로가기
          />
          <span className="settings-title">설정</span>
        </div>
      <h1>개인정보 처리 방침</h1>
      <p>개인정보 처리 방침 페이지입니다.</p>
      <p className="p">ⓒ 2024. HAB-EAT All rights reserved</p>
    </div>
  );
};

export default PrivacyPolicy;
