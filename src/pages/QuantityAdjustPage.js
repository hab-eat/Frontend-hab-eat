import React, { useState } from 'react';
import './QuantityAdjustPage.css';

const QuantityAdjustPage = ({ foodName }) => {
  const [quantity, setQuantity] = useState('');

  // 입력 값 핸들러
  const handleChange = (e) => {
    const value = e.target.value;
    // 숫자만 입력 허용
    if (/^\d*$/.test(value)) {
      setQuantity(value);
    }
  };

  // 입력 완료 핸들러
  const handleSubmit = () => {
    alert(`${foodName}의 양이 ${quantity}g으로 설정되었습니다.`);
  };

  return (
    <div className="quantity-adjust-container">
      <h1 className="quantity-adjust-title">{foodName} 양 조절</h1>
      <div className="quantity-input-container">
        <input
          type="text"
          className="quantity-input"
          placeholder="양을 입력하세요 (g)"
          value={quantity}
          onChange={handleChange}
        />
      </div>
      <button className="quantity-submit-button" onClick={handleSubmit}>
        입력 완료
      </button>
    </div>
  );
};

export default QuantityAdjustPage;
