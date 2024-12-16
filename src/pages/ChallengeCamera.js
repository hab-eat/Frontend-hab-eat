// 개인정보 처리 방침 페이지
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import LoadingPage from '../pages/LoadingPage';
import Api from '../api';

const API_URL = process.env.REACT_APP_BAEKEND_URL;
const TOKEN = process.env.REACT_APP_API_TOKEN;

const ChallengeCamera = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const file = location.state?.file;
  const id = location.state?.id;
  const [loading, setLoading] = useState(false); // 로딩 상태

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

        await Api.uploadImageToSignedUrl({
          signedUrl: url,
          file,
          type: file.type,
        });

        //AI 모델 호출
        const analysisResult = await certifyChallengeImage(id, key);
        console.log({ analysisResult });

        // 결과 처리
        // setResult(analysisResult); // 분석 결과 저장

        const currentDate = new Date();
        const month = currentDate.getMonth() + 1; // 0-based -> 1-based
        const year = currentDate.getFullYear();
        // Step 5: 챌린지 페이지로 이동
        navigate(`/challenge`, { state: { challengeId: id, month, year } });
      } catch (error) {
        console.error('이미지 분석 중 오류 발생:', error);
        console.log(error);
        alert('이미지 분석 중 오류가 발생했습니다.');
        return navigate(`/challenge`); // 오류 발생 시에도 챌린지 페이지로 이동
      }
    };

    analyze();
  }, [file, id, navigate]); // file이 변경될 때만 실행

  if (loading) return <LoadingPage />;
  return (
    <div className="div">
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

const certifyChallengeImage = async (id, key) => {
  return Api.postChallengeCertifications(id, key);
};
