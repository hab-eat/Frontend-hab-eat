import { useState } from 'react';
import './NutritionMeals.css';

const NutritionMeals = () => {
  const [meals, setMeals] = useState({
    breakfast: ['토스트', '커피'],
    lunch: ['샐러드'],
    dinner: [],
  });

  return (
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
  );
};

export default NutritionMeals;
