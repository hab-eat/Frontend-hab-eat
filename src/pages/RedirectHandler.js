import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';

const RedirectHandler = ({ onLoginSuccess }) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const code = searchParams.get('code'); // 카카오 인가 코드

  useEffect(() => {
    if (code) {
      // 백엔드로 인가 코드 전달
      axios
        .post('http://localhost:5000/api/kakao-login', { code })
        .then((response) => {
          console.log('카카오 로그인 성공:', response.data);
          onLoginSuccess(); // 로그인 성공 시 상태 업데이트
          navigate('/'); // UserInfoPage로 리다이렉트
        })
        .catch((error) => {
          console.error('카카오 로그인 실패:', error);
          alert('로그인 실패! 다시 시도해주세요.');
        });
    }
  }, [code, navigate, onLoginSuccess]);

  return <div>카카오 로그인 처리 중...</div>;
};

export default RedirectHandler;
