import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Api from '../api';

const KakaoRedirectPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const signInOrUp = async () => {
      const code = new URL(window.location.href).searchParams.get('code');
      const postUserResponse = await Api.getKakaoAccessToken(code);

      const snsToken = `${postUserResponse.data.access_token}`;
      const postUserApiResponse = await Api.kakaoSignOrUp({ snsToken });
      localStorage.setItem('Back_Token', postUserApiResponse.token);

      return postUserApiResponse?.isNew
        ? navigate('/userinfo')
        : navigate('/nutrition');
    };

    signInOrUp().catch((error) => {
      console.error('kakao login error', error);
      alert('카카오 로그인 오류가 발생했습니다.');
      navigate('/');
    });
  }, []);

  return null;
};

export default KakaoRedirectPage;
