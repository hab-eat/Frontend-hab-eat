// 챌린지 카메라 동작 페이지
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import LoadingPage from '../pages/LoadingPage';
import Api from '../api';

// const API_URL = process.env.REACT_APP_BAEKEND_URL;
// const TOKEN = process.env.REACT_APP_API_TOKEN;

const ChallengeCamera = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const file = location.state?.file;
  const id = location.state?.id;
  const [loading, setLoading] = useState(false); // 로딩 상태
  // const [result, setResult] = useState(null); // 분석 결과 저장
  // const [error, setError] = useState(null);

  const currentDate = new Date();
  const month = currentDate.getMonth() + 1; // 0-based -> 1-based
  const year = currentDate.getFullYear();

  useEffect(() => {
    const analyze = async () => {
      if (!file) {
        alert('파일이 없습니다.');
        return;
      }

      setLoading(true);

      try {
        const { url, key } = await fetchPresignedUrl(file.name, file.type);
        console.log('presignedUrl:', url);
        console.log('key:', key);

        await Api.uploadImageToSignedUrl({
          signedUrl: url,
          file,
          type: file.type,
        });

        const analysisResult = await certifyChallengeImage(id, key);

        navigate('/success', {
          state: { analysisResult, challengeId: id, month, year },
        });
      } catch (error) {
        console.log('이미지 분석 중 오류 발생:', error.code);

        let message;
        if (error.response.status === 409) {
          message = '이미 인증 완료된 챌린지입니다.';
        }
        navigate('/retry', {
          state: { challengeId: id, month, year, message },
        });
      } finally {
        setLoading(false); // 로딩 종료
      }
    };

    analyze();
  }, [file, id, navigate]); // file이 변경될 때만 실행

  if (loading) return <LoadingPage />;
  return (
    <div
      className="div"
      style={{
        background:
          'linear-gradient(172deg, #00CBA6 10.22%, #00CBA6 40.85%, #0086D3 89.78%)',
      }}
    >
      <h1>로딩 중...</h1>
    </div>
  );
};

export default ChallengeCamera;

const fetchPresignedUrl = async () => {
  const data = await Api.getChallengePresignedUrls();

  // 배열 형태로 응답이 오는 경우
  if (Array.isArray(data) && data.length > 0) {
    const { url, key } = data[0]; // 첫 번째 항목 사용
    return { url, key };
  } else {
    throw new Error('응답 데이터가 올바르지 않습니다.');
  }
};

// const uploadImage = async (url, file) => {
//   console.log(file.type);
//   const response = await fetch(url, {
//     method: 'PUT',
//     mode: 'cors',
//     headers: {
//       'Content-Type': file.type,
//     },
//     body: file,
//   });

//   console.log(response);

//   if (!response.ok) {
//     throw new Error('이미지 업로드 실패');
//   }
// };

const certifyChallengeImage = async (id, key) => {
  return Api.postChallengeCertifications(id, key);
};
