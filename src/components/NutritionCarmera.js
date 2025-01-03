import React, { useRef } from 'react';
import './NutritionCarmera.css';
import Api from '../api';
import { useNavigate } from 'react-router-dom';
import cameraIcon from '../img/camera-icon.svg';

const NutritionCarmera = ({ setLoading }) => {
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

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

  return (
    <div className="nav-center">
      <button className="camera-button" onClick={handleCameraClick}>
        <img src={cameraIcon} alt="카메라" className="camera-icon" />
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
  );
};

export default NutritionCarmera;
