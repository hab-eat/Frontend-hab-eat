import React, { useState } from 'react';
import './NutritionPage.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import NavigationBar from '../components/NavigationBar'; // 네비게이션 바 컴포넌트 가져오기

const NutritionPage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const [meals, setMeals] = useState({
    breakfast: ['토스트', '커피'],
    lunch: ['샐러드'],
    dinner: [],
  });

  const handleCalendarToggle = () => {
    setIsCalendarOpen(!isCalendarOpen);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setIsCalendarOpen(false);
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

      {/* 식사 섹션 */}
      <div className="meal-section">
        {['breakfast', 'lunch', 'dinner'].map((mealKey) => (
          <div key={mealKey} className="meal-container">
            <h3 className="meal-title">
              {mealKey === 'breakfast'
                ? '아침'
                : mealKey === 'lunch'
                ? '점심'
                : '저녁'}
            </h3>
            <div className="meal-box">
              {meals[mealKey].length > 0 ? (
                meals[mealKey].map((food, idx) => (
                  <p key={idx} className="meal-item">
                    {food}
                  </p>
                ))
              ) : (
                <p>등록된 음식이 없습니다.</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* 네비게이션 바 */}
      <NavigationBar />
    </div>
  );
};

export default NutritionPage;
