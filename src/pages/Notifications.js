// 알림 설정 페이지
import React from "react";
import { useNavigate } from "react-router-dom";
// import back from "./back.svg";
import "./Settings.css";

import back from "../img/back.svg";
// import "../css/Settings.css";
import ToggleSwitch from "./elements/ToggleSwitch";

export const Notifications = () => {
  const navigate = useNavigate();

  // 토글 변경 시 상태 처리 (필요하면 추가 작업 가능)
  const handleToggleChange = (isToggled) => {
    console.log("토글 상태:", isToggled);
  };

  return (
    <div className="settings">
      <div className="div">
        {/* 헤더 */}
        <div className="settings-header">
          <img
            className="settings-back-icon"
            alt="Back"
            src={back}
            onClick={() => navigate(-1)} // 뒤로가기
          />
          <span className="settings-title">알림</span>
        </div>

        {/* 설정 항목들 */}
        <div className="settings-item">
          <span>식단 업로드</span>
          <ToggleSwitch initial={true} onChange={handleToggleChange} />
        </div>
        <div className="settings-item">
          <span>식단 피드백</span>
          <ToggleSwitch initial={false} onChange={handleToggleChange} />
        </div>
        <div className="settings-item">
          <span>습관</span>
          <ToggleSwitch initial={false} onChange={handleToggleChange} />
        </div>

        <p className="p">ⓒ 2024. HAB-EAT All rights reserved</p>
      </div>
    </div>
  );
};

export default Notifications;
