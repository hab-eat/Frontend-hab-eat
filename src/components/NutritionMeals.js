import { useEffect, useState } from 'react';
import './NutritionMeals.css';
import api from '../api';

const NutritionMeals = () => {
  const [meals, setMeals] = useState({
    breakfast: [],
    lunch: [],
    dinner: [],
  });
  const [selectedFood, setSelectedFood] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const handleFoodClick = (food) => {
    setSelectedFood(food);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedFood(null);
  };

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
                <p
                  key={idx}
                  className="meal-item"
                  onClick={() => handleFoodClick(food)}
                  style={{ cursor: 'pointer', color: '#007bff' }}
                >
                  {food.name}
                </p>
              ))
            ) : (
              <p>등록된 음식이 없습니다.</p>
            )}
          </div>
        </div>
      ))}

      {isModalOpen && selectedFood && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>{selectedFood.name}</h2>
            <ul className="nutrition-list">
              <li>amount: {selectedFood.amount} g</li>
              <li>kcal: {selectedFood.kcal} kcal</li>
              <li>carbohydrate: {selectedFood.carbohydrate} g</li>
              <li>protein: {selectedFood.protein} g</li>
              <li>fat: {selectedFood.fat} g</li>
              <li>natrium: {selectedFood.natrium} mg</li>
              <li>cholesterol: {selectedFood.cholesterol} mg</li>
              <li>sugar: {selectedFood.sugar} g</li>
            </ul>
            <button className="close-button" onClick={closeModal}>
              닫기
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NutritionMeals;
