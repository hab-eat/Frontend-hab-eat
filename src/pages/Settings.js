// 설정 페이지
import React from "react";
import { useNavigate } from "react-router-dom";
import MyPageItem from "./elements/MyPageItem"; // 공통 컴포넌트 가져오기
// import back from "./back.svg";  // 뒤로가기 아이콘
// import editIcon from "./edit.png";  // 정보 수정 아이콘
// import privacyIcon from "./privacy.png";    // 개인정보처리방침 아이콘
// import alarm from "./alarm.svg";    // 알림 설정 아이콘

import back from "../img/back.svg";  // 뒤로가기 아이콘
import editIcon from "../img/edit.png";  // 정보 수정 아이콘
import privacyIcon from "../img/privacy.png";    // 개인정보처리방침 아이콘
import alarm from "../img/alarm.svg";    // 알림 설정 아이콘

import "./Settings.css";

// import "../css/Settings.css";

export const Settings = () => {
  const navigate = useNavigate();

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
          <span className="settings-title">설정</span>
        </div>

        {/* 설정 항목 */}
        <MyPageItem
          icon={editIcon}
          text="정보 수정"
          onClick={() => navigate("/settings/edit-profile")}
        />
        <MyPageItem
          icon={alarm}
          text="알림"
          onClick={() => navigate("/settings/notifications")}
        />
        <MyPageItem
          icon={privacyIcon}
          text="개인정보 처리 방침"
          onClick={() => navigate("/settings/privacy-policy")}
        />

        <p className="p">ⓒ 2024. HAB-EAT All rights reserved</p>
      </div>
    </div>
  );
};

export default Settings;
