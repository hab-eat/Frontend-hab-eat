import React from 'react';
import './LoginPage.css';
import habeatIcon from '../img/Hab-eat.svg';

const LoginPage = () => {
  const redirectUrl = process.env.REACT_APP_KAKAO_REDIRECT_URL; // 카카오 개발자 콘솔에 등록된 Redirect URI
  const Rest_api_key = process.env.REACT_APP_KAKAO_REST_API_KEY; // 카카오 REST API 키
  const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${Rest_api_key}&redirect_uri=${redirectUrl}&response_type=code`;

  const handleKakaoLogin = () => {
    window.location.href = kakaoAuthUrl; // 카카오 인증 페이지로 이동
  };

  return (
    <div className="login-container">
      <h1 className="slogan">한 손에 들고 먹는 건강한 습관</h1>
      <img
        src={habeatIcon} // 로고 이미지
        alt="App Logo"
        className="logo"
      />
      <p className="subtitle">여러분의 식단, 같이 찍어봐요!</p>
      <div className="button-container">
        <button className="login-button kakao" onClick={handleKakaoLogin}>
          카카오로 시작하기
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
