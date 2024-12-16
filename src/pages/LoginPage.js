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
// import React from 'react';
// import './LoginPage.css';

// const LoginPage = () => {
//   const redirectUrl = process.env.REACT_APP_KAKAO_REDIRECT_URL; // 카카오 개발자 콘솔에 등록된 Redirect URI
//   const Rest_api_key = process.env.REACT_APP_KAKAO_REST_API_KEY; // 카카오 REST API 키
//   const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${Rest_api_key}&redirect_uri=${redirectUrl}&response_type=code`;

//   const handleKakaoLogin = () => {
//     window.location.href = kakaoAuthUrl; // 카카오 인증 페이지로 이동하기
//   };
//   const code = new URL(window.location.href).searchParams.get("code"); // 인가코드 파싱해오기
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
//         <button className="login-button kakao" onClick={handleKakaoLogin}>
//           카카오로 시작하기
//         </button>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';
import Api from '../api';

const LoginPage = () => {
  const redirectUrl = process.env.REACT_APP_KAKAO_REDIRECT_URL; // 카카오 개발자 콘솔에 등록된 Redirect URI
  const Rest_api_key = process.env.REACT_APP_KAKAO_REST_API_KEY; // 카카오 REST API 키
  const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${Rest_api_key}&redirect_uri=${redirectUrl}&response_type=code`;

  const navigate = useNavigate();

  useEffect(() => {
    console.log('use effect');
    const code = new URL(window.location.href).searchParams.get('code');
    if (code) {
      // 1. 카카오 서버에 인가 코드로 액세스 토큰 요청
      Api.getKakaoAccessToken(code)
        .then((response) => {
          const { access_token } = response.data;
          console.log('kakao server response');
          console.log(response.data);
          localStorage.setItem('snsToken', access_token); // 토큰을 로컬 스토리지에 저장
          console.log('로그인 성공');
          navigate('/userinfo'); // UserInfoPage로 이동
        })
        .catch((error) => {
          console.error('카카오 토큰 요청 실패:', error);
          alert('카카오 로그인 실패. 다시 시도해주세요.');
        });
    }
  }, []);

  const handleKakaoLogin = () => {
    window.location.href = kakaoAuthUrl; // 카카오 인증 페이지로 이동
  };

  return (
    <div className="login-container">
      <h1 className="title">한 손에 들고 먹는 건강한 습관</h1>
      <img
        src="./Hab-eat.png" // 로고 이미지
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
