import React, { useState, useEffect } from 'react';
import './NutritionPage.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import NavigationBar from '../components/NavigationBar'; // 네비게이션 바 컴포넌트 가져오기
import LoadingPage from '../pages/LoadingPage';
import NutritionCarmera from '../components/NutritionCarmera';

const NutritionPage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [meals, setMeals] = useState({
    breakfast: ['토스트', '커피'],
    lunch: ['샐러드'],
    dinner: [],
  });
  const [isLoading, setLoading] = useState(false);

  const [nutrients, setNutrients] = useState({
    kcal: 0,
    carbohydrate: 0,
    protein: 0,
    fat: 0,
    natrium: 0,
    cholesterol: 0,
    sugar: 0,
  });
  const [error, setError] = useState('');

  const handleCalendarToggle = () => {
    setIsCalendarOpen(!isCalendarOpen);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setIsCalendarOpen(false);
  };

  const fetchNutrientData = async () => {
    const apiUrl = `${process.env.REACT_APP_BACKEND_URL}users/target-nutrients`; // Ensure this URL is correct
    console.log('Request URL:', apiUrl);

    try {
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('Back_Token')}`, // 토큰 추가
        },
      });

      console.log('Response Status:', response.status);

      if (response.ok) {
        const data = await response.json();
        console.log('Response Data:', data);
        setNutrients(data); // 데이터 상태 업데이트
      } else {
        // 서버에서 응답은 있지만 에러 코드가 있을 때
        const errorData = await response.json();
        console.error('API Error Response:', errorData);
        throw new Error(
          `Server Error: ${errorData.message || 'Unknown error'}`,
        );
      }
    } catch (err) {
      setError(err.message);
      console.error('영양 정보 가져오기 실패:', err);
    }
  };

  useEffect(() => {
    fetchNutrientData();
  }, []);

  return isLoading ? (
    <LoadingPage />
  ) : (
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
        {error ? (
          <p className="error-message">영양 정보 가져오기 실패: {error}</p>
        ) : (
          <>
            <p>
              칼로리: <b>1500</b>/<b>{Math.round(nutrients.kcal)}</b> kcal
            </p>
            <p>
              탄수화물: <b>100</b>/<b>{Math.round(nutrients.carbohydrate)}</b>g
              | 단백질: <b>50</b>/<b>{Math.round(nutrients.protein)}</b>g
            </p>
            <p>
              지방: <b>20</b>/<b>{Math.round(nutrients.fat)}</b>g | 나트륨:{' '}
              <b>50</b>/<b>{Math.round(nutrients.natrium)}</b>mg
            </p>
            <p>
              콜레스테롤: <b>50</b>/<b>{Math.round(nutrients.cholesterol)}</b>mg
              | 당: <b>50</b>/<b>{Math.round(nutrients.sugar)}</b>g
            </p>
          </>
        )}
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
      <NavigationBar
        CarmeraElement={<NutritionCarmera setLoading={setLoading} />}
      />
    </div>
  );
};

export default NutritionPage;
