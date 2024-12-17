import React, { useState } from 'react';
import './FoodSelectionPage.css';
import { useLocation } from 'react-router-dom';

const FoodSelectionPage = () => {
  const location = useLocation();

  const foodName = location.state?.foodName || '';

  const [searchTerm, setSearchTerm] = useState(foodName);
  const [suggestions, setSuggestions] = useState([]);

  // 검색어 입력 핸들러
  const handleChange = async (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    // API 호출 로직은 여기에 추가하면 됩니다.
    setSuggestions(['예시 음식1', '예시 음식2', '예시 음식3', '예시 음식4']); // 임시 데이터
  };

  // 자동완성 항목 클릭 핸들러
  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion); // 선택된 항목을 입력창에 설정
    setSuggestions([]); // 자동완성 리스트 숨기기
  };

  // 확인 버튼 핸들러
  const handleConfirm = () => {
    alert(`선택된 음식: ${searchTerm}`);
  };

  return (
    <div className="food-selection-container">
      <h1 className="food-selection-title">음식 선택</h1>
      <div className="search-input-container">
        <input
          type="text"
          className="search-input"
          placeholder="음식 이름을 검색하세요"
          value={searchTerm}
          onChange={handleChange}
        />
        {/* 자동완성 리스트 */}
        {suggestions.length > 0 && (
          <ul className="suggestions-list">
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                onClick={() => handleSuggestionClick(suggestion)} // 항목 클릭 시
                className="suggestion-item"
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </div>
      <button className="confirm-button" onClick={handleConfirm}>
        확인
      </button>
    </div>
  );
};

export default FoodSelectionPage;
