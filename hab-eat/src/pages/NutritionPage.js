import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './NutritionPage.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


const NutritionPage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());


const [isCalendarOpen, setIsCalendarOpen] = useState(false); // 달력 상태 추가

const handleCalendarToggle = () => {
  setIsCalendarOpen(!isCalendarOpen); // 달력 열기/닫기 토글
};
  const handleDateChange = (date) => {
    setSelectedDate(date);
    setIsCalendarOpen(false); // 날짜 선택 후 달력 닫기
  };
  

  return (
    <div className="nutrition-container">
      {/* 달력 버튼 */}
      <div className="calendar-section">
        <span className="selected-date">
        {selectedDate.toLocaleDateString('ko-KR')}
        </span>
        <button className="calendar-button" onClick={handleCalendarToggle}>
        달력
        </button>
      </div>

      {/* 달력 표시 */}
    {isCalendarOpen && (
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        inline 
        className="datepicker"
      />
      
    )}

      {/* 영양 정보 섹터 */}
      <div className="nutrition-info">
        <p>
          섭취 칼로리: <b>1500</b> / 권장 칼로리: <b>2000</b> kcal
        </p>
        <p>
          섭취 단백질: <b>50g</b> / 권장 단백질: <b>75g</b>
        </p>
        <p>탄수화물: 200g | 지방: 50g | 당: 20g</p>
      </div>

      {/* 식사 섹터 */}
      <div className="meal-section">
        <div className="meal-time">
          <h3>아침</h3>
          <div className="meal-items">등록된 음식이 없습니다.</div>
        </div>
        <div className="meal-time">
          <h3>점심</h3>
          <div className="meal-items">등록된 음식이 없습니다.</div>
        </div>
        <div className="meal-time">
          <h3>저녁</h3>
          <div className="meal-items">등록된 음식이 없습니다.</div>
        </div>
      </div>

      {/* 네비게이터 바 */}
      <div className="navigator">
        <Link to="/nutrition" className="navigator-item active">
          식단
        </Link>
        <Link to="/habit" className="navigator-item">
          습관
        </Link>
        <button className="navigator-item camera">📷</button>
        <Link to="/mypage" className="navigator-item">
          마이페이지
        </Link>
        <Link to="/call" className="navigator-item">
          문의하기
        </Link>
      </div>
    </div>
  );
};

export default NutritionPage;
