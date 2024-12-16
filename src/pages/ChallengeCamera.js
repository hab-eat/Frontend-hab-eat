// 챌린지 카메라 동작 페이지
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const API_URL = process.env.REACT_APP_BACKEND_URL;
const TOKEN = process.env.REACT_APP_API_TOKEN;

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
    // 이미지 분석 시작
    const analyze = async () => {
      if (!file) {
        alert('파일이 없습니다.');
        return;
      }

      setLoading(true); // 로딩 시작

      try {
        // Presigned URL 가져오기
        const { url, key } = await fetchPresignedUrl(file.name, file.type);
        console.log('presignedUrl:', url);
        console.log('key:', key);

        await uploadImage(url, file);

        
        //AI 모델 호출
        const analysisResult = await analyzeImage(key, id);
        console.log(analysisResult);

      
        // 결과 처리
        // setResult(analysisResult); // 분석 결과 저장

        // Step 5: 챌린지 페이지로 이동
        navigate(`/challenge`, { state: { challengeId: id, month, year } });
      } catch (error) {
        if (error.response && error.response.status === 400) {
          // 400 Bad Request 처리
          alert('잘못된 요청입니다. 이미지 형식이나 크기를 확인하세요.');
          navigate(`/retry`, { state: { challengeId: id, month, year } }); // 재도전 페이지로 이동
        } else {
          // 기타 에러 처리
          alert('이미지 분석 중 오류가 발생했습니다.');
          navigate(`/challenge`, { state: { challengeId: id, month, year } });
        }
      }
    };

    analyze();
  }, [file]); // file이 변경될 때만 실행

  if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error: {error}</p>;

  return (
    <div className="div">
      <h1>로딩 중...</h1>
    </div>
  );
};

export default ChallengeCamera;

const fetchPresignedUrl = async () => {
  const response = await fetch(`${API_URL}challenges/presigned-urls`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    throw new Error('Presigned URL 요청 실패');
  }
  const data = await response.json(); // 서버에서 presigned URL과 key 반환

  // 배열 형태로 응답이 오는 경우
  if (Array.isArray(data) && data.length > 0) {
    const { url, key } = data[0]; // 첫 번째 항목 사용
    return { url, key };
  } else {
    throw new Error('응답 데이터가 올바르지 않습니다.');
  }
};

const uploadImage = async (url, file) => {
  console.log(file.type);
  const response = await fetch(url, {
    method: 'PUT',
    mode: 'cors',
    headers: {
      'Content-Type': file.type,
    },
    body: file,
  });

  console.log(response);

  if (!response.ok) {
    throw new Error('이미지 업로드 실패');
  }
};

const analyzeImage = async (key, id) => {
  const response = await fetch(`${API_URL}challenges/${id}/certifications`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ key }),
  });

  if (!response.ok) {
    throw new Error('이미지 분석 요청 실패');
  }

  const result = await response.json();
  return result;
};
