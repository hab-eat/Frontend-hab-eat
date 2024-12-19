import React, { useState, useRef } from 'react';
import './FoodAnalysisCheckPage.css';
import { useLocation, useNavigate } from 'react-router-dom';
import Api from '../api';
import LoadingPage from '../pages/LoadingPage';

const FoodAnalysisRetryPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const foodName = location.state?.foodName || '';
  const comment = location.state?.comment || 'Hab-eat이 생각한 음식은..';
  const fileInputRef = useRef(null);
  const [isLoading, setLoading] = useState(false);
  if (isLoading) return <LoadingPage />;
 
  
  const handleCameraClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log('Captured file:', file);
      setLoading(true); // 로딩 시작

      try {
        // Step 1: foods/presigned-urls 호출
        const urls = await Api.getFoodPresignedUrls();
        const { url, key } = urls[0];
        console.log('Presigned URL and Key:', { url, key });

        // Step 2: S3로 사진 업로드
        await Api.uploadImageToSignedUrl({
          signedUrl: url,
          file,
          type: file.type,
        });

        console.log('Image uploaded to S3 successfully');

        // Step 3: foods/get-image-name 호출

        const { name } = await Api.getFoodClassName(key);
        navigate('/analysis/food-image/result', { state: { foodName: name } });
        setLoading(false);
      } catch (error) {
        console.error('Error during image upload flow:', error);
        setLoading(false);
        alert('사진 업로드 중 문제가 발생했습니다. 다시 시도해주세요.');
      }
    }
  };

  const onClickRetryBtn = () => {
    // navigate('/nutrition');
    handleCameraClick();
  };

  const onClickEnterBtn = () => {
    navigate('/food/direct-input');
  };

  return (
    <div className="result-second-container">
    <div className="result-second-overlay"></div> {/* 어두운 레이어 */}
      <div className="result-second-content">
        <h1 className="result-second-title">{comment}</h1>
        <h2 className="result-second-food-name">
          {/*foodname여기서 받아주세영*/}
          <span>{foodName}</span>입니다!
        </h2>
        <div className="result-second-image-container">
        <img
            src={'/folder.png'}        
          className="result-image"
        />
          
        </div>
        <div className="result-second-buttons">
          <button className="result-second-button" onClick={onClickRetryBtn}>
            다시 촬영
          </button>
          <input
          type="file"
          accept="image/*"
          capture="camera" // 카메라 호출
          style={{ display: 'none' }} // 숨겨진 input
          ref={fileInputRef}
          onChange={handleFileChange}
        />
          <div className="result-second-divider"></div>
          <button className="result-second-button" onClick={onClickEnterBtn}>
            직접 입력
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodAnalysisRetryPage;
