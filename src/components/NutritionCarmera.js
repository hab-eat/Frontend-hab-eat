import React, { useRef } from 'react';

const NutritionCarmera = ({ setLoading }) => {
  const fileInputRef = useRef(null);

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
  );
};

export default NutritionCarmera;
