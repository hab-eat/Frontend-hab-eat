import { useEffect, useState } from 'react';
import './NutritionMeals.css';
import api from '../api';

const NutritionMeals = () => {
  const [meals, setMeals] = useState({
    breakfast: [],
    lunch: [],
    dinner: [],
  });

  useEffect(() => {
    const fetch = async () => {
      try {
        const dateString = new Date(Date.now() + 9 * 60 * 60 * 1000)
          .toISOString()
          .slice(0, 10);
        const res = await api.getDiets(dateString);
        setMeals(res);
      } catch (error) {}
    };

    fetch();
  }, []);

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
              meals[mealKey].map((food, idx) => {
                console.log(food.name);
                return (
                  <p key={idx} className="meal-item">
                    {food.name}
                  </p>
                );
              })
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
