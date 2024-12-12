import React from "react";
import { useNavigate } from "react-router-dom";
import MyPageItem from "./elements/MyPageItem";  // 목록(아이템) 컴포넌트
import NavigationBar from '../components/NavigationBar'; // 네비게이션 바 컴포넌트 가져오기

// import settingsIcon from "./settings.svg";  // 설정 아이콘
// import guideIcon from "./guide.svg";    // 이용안내 아이콘
// import deleteIcon from "./delete.png";  // 회원 탈퇴 아이콘
// import logoutIcon from "./logout.svg";  // 로그아웃 아이콘

import settingsIcon from "../img/settings.svg";  // 설정 아이콘
import guideIcon from "../img/guide.svg";    // 이용안내 아이콘
import deleteIcon from "../img/delete.svg";  // 회원 탈퇴 아이콘
import logoutIcon from "../img/logout.svg";  // 로그아웃 아이콘

import "./MyPage.css";
// import "../css/MyPage.css";

// 마이페이지 메인
export const MyPage = () => {
  const navigate = useNavigate();

  return (
    <div className="mypage">
      <div className='top'>
        <h1 className='title'>마이페이지</h1>
      </div>
      <div className="div">
        {/* <div className="mypage-header">
          <span className="mypage-title">마이페이지</span>
        </div> */}

        {/* 버튼 리스트 */}
        <MyPageItem
          icon={settingsIcon}
          text="설정"
          onClick={() => navigate("/settings")}
        />
        <MyPageItem
          icon={guideIcon}
          text="이용 안내"
          onClick={() => navigate("/guide")} 
        />
        <MyPageItem
          icon={logoutIcon}
          text="로그아웃"
          onClick={() => alert("로그아웃 클릭됨")}  // 아직 알림만 오도록 설정, 추가 구현 필요
        />
        <MyPageItem
          icon={deleteIcon}
          text="회원 탈퇴"
          onClick={() => alert("회원 탈퇴 클릭됨")} // 아직 알림만 오도록 설정, 추가 구현 필요
        />

        <p className="p">ⓒ 2024. HAB-EAT All rights reserved</p>
      </div>
      <NavigationBar />
    </div>
  );
};

export default MyPage;
