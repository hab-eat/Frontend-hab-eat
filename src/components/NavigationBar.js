import React, { useRef, useState } from 'react';
import './NavigationBar.css';

const NavigationBar = () => {
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(false); // 로딩 상태
  const [result, setResult] = useState(null); // 결과 상태

  const handleCameraClick = () => {
    fileInputRef.current.click(); // 파일 입력 창 열기
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log('Captured file:', file);
      setLoading(true); // 로딩 시작

      try {
        // Step 1: foods/presigned-urls 호출
        const presignedResponse = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}foods/presigned-urls`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${localStorage.getItem('Back_Token')}`,
              'Content-Type': 'application/json',
            },
          },
        );

        if (!presignedResponse.ok) {
          throw new Error('Failed to get presigned URL');
        }

        const urls = await presignedResponse.json();
        const { url, key } = urls[0];
        console.log('Presigned URL and Key:', { url, key });

        // Step 2: S3로 사진 업로드
        await fetch(url, {
          method: 'PUT',
          mode: 'cors',
          headers: {
            'Content-Type': file.type,
          },
          body: file,
        });
        console.log('Image uploaded to S3 successfully');

        // Step 3: foods/get-image-name 호출
        const imageNameResponse = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}foods/class-names`,
          {
            method: 'POST',
            headers: {
              authorization: `Bearer ${localStorage.getItem('Back_Token')}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ key }),
          },
        );

        if (!imageNameResponse.ok) {
          throw new Error(
            `Failed to fetch image name: ${imageNameResponse.status}`,
          );
        }

        const { name } = await imageNameResponse.json();
        console.log('Fetched image name:', name);

        setResult(name); // 결과 저장
        setLoading(false); // 로딩 종료
      } catch (error) {
        console.error('Error during image upload flow:', error);
        setLoading(false); // 로딩 종료
        alert('사진 업로드 중 문제가 발생했습니다. 다시 시도해주세요.');
      }
    }
  };

  return (
    <div>
      {/* 로딩 화면 */}
      {loading ? (
        <div className="loading-container">
          <h1>분석 중...</h1>
          <p>잠시만 기다려주세요</p>
        </div>
      ) : result ? (
        // 결과 화면
        <div className="result-container">
          <h1>음식 판별 결과</h1>
          <p>
            판별된 음식: <strong>{result}</strong>
          </p>
        </div>
      ) : (
        // 네비게이션 바
        <div className="navigation-bar">
          {/* 왼쪽 섹션: 식단, 습관 */}
          <div className="nav-left">
            <div className="nav-item">
              <img src="/nutrition-icon.png" alt="식단" className="nav-icon" />
              <span className="nav-label">식단</span>
            </div>
            <div className="nav-item">
              <img src="/habit-icon.png" alt="습관" className="nav-icon" />
              <span className="nav-label">습관</span>
            </div>
          </div>

          {/* 중앙 섹션: 카메라 */}
          <div className="nav-center">
            <button className="camera-button" onClick={handleCameraClick}>
              <img
                src="/camera-icon.png"
                alt="카메라"
                className="camera-icon"
              />
            </button>
            <input
              type="file"
              accept="image/*"
              capture="camera" // 카메라 호출
              style={{ display: 'none' }} // 숨겨진 input
              ref={fileInputRef}
              onChange={handleFileChange}
            />
          </div>

          {/* 오른쪽 섹션: 마이페이지 */}
          <div className="nav-right">
            <div className="nav-item">
              <img
                src="/mypage-icon.png"
                alt="마이페이지"
                className="nav-icon"
              />
              <span className="nav-label">마이페이지</span>
            </div>
            <div className="nav-item">
              <img
                src="/contact-icon.png"
                alt="문의하기"
                className="nav-icon"
              />
              <span className="nav-label">문의</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavigationBar;
