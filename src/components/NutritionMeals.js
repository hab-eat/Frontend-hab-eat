import { useEffect, useState } from 'react';
import './NutritionMeals.css';
import api from '../api';

const NutritionMeals = ({ selectedDate }) => {
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
        const dateString = selectedDate.toISOString().slice(0, 10);
        const res = await api.getDiets(dateString);
        setMeals(res);
      } catch (error) {}
    };

    fetch();
  }, [selectedDate]);

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
                  style={{ cursor: 'pointer', color: '#00c5a1' }}
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
              <li>양: {Math.round(selectedFood.amount)} g</li>
              <li>칼로리: {Math.round(selectedFood.kcal)} kcal</li>
              <li>탄수화물: {Math.round(selectedFood.carbohydrate)} g</li>
              <li>단백질: {Math.round(selectedFood.protein)} g</li>
              <li>지방: {Math.round(selectedFood.fat)} g</li>
              <li>나트륨: {Math.round(selectedFood.natrium)} mg</li>
              <li>콜레스테롤: {Math.round(selectedFood.cholesterol)} mg</li>
              <li>당: {Math.round(selectedFood.sugar)} g</li>
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
