import React from 'react';
import './LoginPage.css';

const LoginPage = () => {
  return (
    <div className="login-container">
     
      <h1 className="title">한 손에 들고 먹는 건강한 습관</h1>
      <img
        src="./Hab-eat.png" // 로고 이미지 경로 (public 폴더에 logo.png 추가)
        alt="App Logo"
        className="logo"
      />
      <p className="subtitle">
        여러분의 식단, 같이 찍어봐요!
      </p>
      <div className="button-container">
        <button className="login-button naver">네이버로 시작하기</button>
        <button className="login-button kakao">카카오로 시작하기</button>
      </div>
    </div>
  );
};

export default LoginPage;
