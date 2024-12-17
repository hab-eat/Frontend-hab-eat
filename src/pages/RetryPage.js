import React, { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const RetryPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  // 에러 정보 및 기타 데이터 가져오기
  const { challengeId, month, year, error } = location.state || {};

  const handleCameraClick = () => fileInputRef.current.click();
  const handleFileChange = (event) => {
    const id = challengeId;
    const file = event.target.files[0];
    // if (file) alert(`사진이 선택되었습니다: ${file.name}`);
    if (file) {
      navigate(`/challenge/camera`, { state: { file, id } });
    }
  };

  useEffect(() => {
      // body 스타일 설정
      document.body.style.background = 'linear-gradient(172deg, #00CBA6 10.22%, #00CBA6 40.85%, #0086D3 89.78%)';
      document.body.style.margin = '0';
      document.body.style.padding = '0';
      document.body.style.height = '100vh';
  
      // 컴포넌트 언마운트 시 원래 상태로 복원
      return () => {
        document.body.style.background = '';
        document.body.style.margin = '';
        document.body.style.padding = '';
        document.body.style.height = '';
      };
    }, []);

  return (
    <div className='App' style={{ marginTop: '50%', textAlign: 'center', color: 'white' }}>
      <h1 style={{ color: 'white' }}>😢 분석 실패 😢</h1>
      {error && (
        <div>
          <h3>오류 메시지:</h3>
          <p style={{ color: 'red' }}>{error.message || '알 수 없는 오류가 발생했습니다.'}</p>
        </div>
      )}
      <p>챌린지 ID: {challengeId}</p>
      <div style={{ marginTop: '20px' }}>
        <button
          style={{ marginRight: '10px', padding: '10px 20px', backgroundColor: '#00C5A1', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', marginBottom: '10px' }}
          onClick={handleCameraClick}
        >
          다시 찍기
        </button>
        <input
              type="file"
              accept="image/*"
              capture="camera"
              style={{ display: 'none' }}
              ref={fileInputRef}
              onChange={handleFileChange}
            />
        <button
          style={{ padding: '10px 20px', backgroundColor: '#f44336', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
          onClick={() => navigate('/challenge', { state: { challengeId, month, year } })}
        >
          돌아가기
        </button>
      </div>
    </div>
  );
};

export default RetryPage;
