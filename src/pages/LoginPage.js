// import React from 'react';
// import './LoginPage.css';
// import KakaoLogin from 'react-kakao-login';
// import NaverLogin from 'react-naver-login';

// // 환경 변수에서 키 가져오기
// const KAKAO_JAVASCRIPT_KEY = process.env.REACT_APP_KAKAO_JAVASCRIPT_KEY;
// const NAVER_CLIENT_ID = process.env.REACT_APP_NAVER_CLIENT_ID;
// const NAVER_CALLBACK_URL = process.env.REACT_APP_NAVER_CALLBACK_URL;
// const KAKAO_CALLBACK_URL = process.env.REACT_APP_KAKAO_REDIRECT_URL;

// const LoginPage = () => {
//   const handleKakaoSuccess = (response) => {
//     console.log('카카오 로그인 성공:', response);
//     alert(`카카오 로그인 성공!`);
//   };

//   const handleKakaoFailure = (error) => {
//     console.error('카카오 로그인 실패:', error);
//     alert('카카오 로그인에 실패했습니다.');
//   };

//   const handleNaverSuccess = (response) => {
//     console.log('네이버 로그인 성공:', response);
//     alert('네이버 로그인 성공! 정보를 확인해주세요.');
//   };

//   const handleNaverFailure = (error) => {
//     console.error('네이버 로그인 실패:', error);
//     alert('네이버 로그인에 실패했습니다.');
//   };

//   return (
//     <div className="login-container">
//       <h1 className="title">한 손에 들고 먹는 건강한 습관</h1>
//       <img
//         src="./Hab-eat.png" // 로고 이미지 경로 (public 폴더에 추가)
//         alt="App Logo"
//         className="logo"
//       />
//       <p className="subtitle">여러분의 식단, 같이 찍어봐요!</p>
//       <div className="button-container">
//         {/* 네이버 로그인 버튼 */}
//         <NaverLogin
//           clientId={NAVER_CLIENT_ID} // .env에서 가져온 네이버 클라이언트 ID
//           callbackUrl={NAVER_CALLBACK_URL} // .env에서 가져온 네이버 Redirect URL
//           onSuccess={handleNaverSuccess}
//           onFailure={handleNaverFailure}
//           render={(props) => (
//             <button className="login-button naver" onClick={props.onClick}>
//               네이버로 시작하기
//             </button>
//           )}
//         />

//         {/* 카카오 로그인 버튼 */}
//         <KakaoLogin
//           token={KAKAO_JAVASCRIPT_KEY} // .env에서 가져온 카카오 JavaScript 키
//           onSuccess={handleKakaoSuccess}
//           onFail={handleKakaoFailure}
//           onLogout={() => console.log('카카오 로그아웃')}
//           render={(props) => (
//             <button className="login-button kakao" onClick={props.onClick}>
//               카카오로 시작하기
//             </button>
//           )}
//         />
//       </div>
//     </div>
//   );
// };

// export default LoginPage;
import React from 'react';
import './LoginPage.css';

const LoginPage = () => {
  const redirectUri = 'http://localhost:3000/oauth'; // 카카오 개발자 콘솔에 등록된 Redirect URI
  const clientId = "637f367d53c0975652e7451e73b761d3"; // 카카오 REST API 키
  const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}`;

  const handleKakaoLogin = () => {
    window.location.href = kakaoAuthUrl; // 카카오 인증 페이지로 리다이렉트
  };

  return (
    <div className="login-container">
      <h1 className="title">한 손에 들고 먹는 건강한 습관</h1>
      <img
        src="./Hab-eat.png" // 로고 이미지 경로 (public 폴더에 추가)
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

