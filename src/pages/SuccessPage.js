import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const SuccessPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // 분석 결과 및 기타 데이터 가져오기
  //   const { analysisResult, id } = location.state || {};
  const { challengeId, month, year } = location.state || {};

  useEffect(() => {
    // body 스타일 설정
    document.body.style.background =
      'linear-gradient(172deg, #00CBA6 10.22%, #00CBA6 40.85%, #0086D3 89.78%)';
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
    <div
      className="App"
      style={{
        marginTop: '50%',
        background:
          'linear-gradient(172deg, #00CBA6 10.22%, #00CBA6 40.85%, #0086D3 89.78%)',
        color: 'white',
        textAlign: 'center',
      }}
    >
      <h1 style={{ color: 'white' }}>🎉 분석 성공! 🎉</h1>
      {/* <p>챌린지 ID: {challengeId}</p> */}
      {/* {analysisResult && (
        <div>
          <h3>분석 결과:</h3>
          <pre style={{ textAlign: 'left', display: 'inline-block', background: '#f4f4f4', padding: '10px', borderRadius: '5px' }}>
            {JSON.stringify(analysisResult, null, 2)}
          </pre>
        </div>
      )} */}
      <button
        style={{
          marginTop: '20px',
          padding: '10px 20px',
          backgroundColor: '#00C5A1',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
        onClick={() =>
          navigate('/challenge', {
            state: { challengeId: challengeId, month, year },
          })
        }
      >
        챌린지로 돌아가기
      </button>
    </div>
  );
};

export default SuccessPage;
