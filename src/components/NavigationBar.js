import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import './NavigationBar.css';

const NavigationBar = () => {
  const fileInputRef = useRef(null);

  const handleCameraClick = () => {
    fileInputRef.current.click(); // 파일 입력 창 열기
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log('Captured file:', file);
      alert(`사진이 선택되었습니다: ${file.name}`);
    }
  };

  return (
    <div className="navigation-bar">
      {/* 왼쪽 섹션: 식단, 습관 */}
      <div className="nav-left">
        <Link to="/nutrition" className="nav-item">
          <img src="/nutrition-icon.png" alt="식단" className="nav-icon" />
          <span className="nav-label">식단</span>
        </Link>
        <Link to="/habit" className="nav-item">
          <img src="/habit-icon.png" alt="습관" className="nav-icon" />
          <span className="nav-label">습관</span>
        </Link>
      </div>

      {/* 중앙 섹션: 카메라 */}
      <div className="nav-center">
        <button className="camera-button" onClick={handleCameraClick}>
          <img src="/camera-icon.png" alt="카메라" className="camera-icon" />
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
        <Link to="/mypage" className="nav-item">
          <img src="/mypage-icon.png" alt="마이페이지" className="nav-icon" />
          <span className="nav-label">마이페이지</span>
        </Link>
        <Link to="/contact" className="nav-item">
          <img src="/contact-icon.png" alt="문의하기" className="nav-icon" />
          <span className="nav-label">문의</span>
        </Link>
      </div>
    </div>
  );
};

export default NavigationBar;
