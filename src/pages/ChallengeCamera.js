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

        // navigate('/success', { state: { analysisResult, id } });
        navigate('/retry', { state: { challengeId: id, analysisResult, month, year} });

        // Step 5: 챌린지 페이지로 이동
        // navigate(`/challenge`, { state: { challengeId: id, month, year } });
      } catch (error) {
        console.error('오류 발생:', error);

      // 업로드 실패 또는 분석 실패 시 재도전 페이지로 이동
        navigate('/retry', { state: { challengeId: id, month, year, error } });
      } finally {
        setLoading(false); // 로딩 종료
      }
    };

    analyze();
  // }, [file]); // file이 변경될 때만 실행
  }, [file, id, month, year, navigate]); // 의존성 배열 수정

  if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error: {error}</p>;

  return (
    <div className="div" style={{ background: 'linear-gradient(172deg, #00CBA6 10.22%, #00CBA6 40.85%, #0086D3 89.78%)'}}>
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
