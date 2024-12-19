import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './DirectInputPage.css';
import api from '../api';

const DirectInputPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: location.state?.name || '',
    amount: 100,
    kcal: 0,
    carbohydrate: 0,
    protein: 0,
    fat: 0,
    natrium: 0,
    cholesterol: 0,
    sugar: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const dateString = new Date(Date.now() + 9 * 60 * 60 * 1000)
        .toISOString()
        .slice(0, 10);

      await api.postDiets({
        ...formData,
        date: dateString,
      });

      const dietsStats = await api.getDietsStats(dateString);
      await api.postNutriChallengeCertifications({
        kcal: dietsStats.kcal,
        carbohydrate: dietsStats.carbohydrate,
        protein: dietsStats.protein,
        fat: dietsStats.fat,
        natrium: dietsStats.natrium,
        cholesterol: dietsStats.cholesterol,
        sugar: dietsStats.sugar,
      });

      alert('입력이 완료되었습니다!');
      navigate('/nutrition');
    } catch (error) {
      alert('식단 업로드에 실패했습니다.');
    }
  };

  return (
    <div className="direct-input-container">
      <h1 className="direct-input-title">음식 정보 입력</h1>
      <form onSubmit={handleSubmit} className="direct-input-form">
        <div className="direct-input-group">
          <label htmlFor="name">음식명</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="예: 사과"
            required
          />
        </div>
        <div className="direct-input-group">
          <label htmlFor="amount">양 (g)</label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            placeholder="예: 100"
            required
          />
        </div>
        <div className="direct-input-group">
          <label htmlFor="kcal">칼로리 (kcal)</label>
          <input
            type="number"
            id="kcal"
            name="kcal"
            value={formData.kcal}
            onChange={handleChange}
            placeholder="예: 52"
          />
        </div>
        <div className="direct-input-group">
          <label htmlFor="carbohydrate">탄수화물 (g)</label>
          <input
            type="number"
            id="carbohydrate"
            name="carbohydrate"
            value={formData.carbohydrate}
            onChange={handleChange}
            placeholder="예: 14"
          />
        </div>
        <div className="direct-input-group">
          <label htmlFor="protein">단백질 (g)</label>
          <input
            type="number"
            id="protein"
            name="protein"
            value={formData.protein}
            onChange={handleChange}
            placeholder="예: 0.3"
          />
        </div>
        <div className="direct-input-group">
          <label htmlFor="fat">지방 (g)</label>
          <input
            type="number"
            id="fat"
            name="fat"
            value={formData.fat}
            onChange={handleChange}
            placeholder="예: 0.2"
          />
        </div>
        <div className="direct-input-group">
          <label htmlFor="natrium">나트륨 (mg)</label>
          <input
            type="number"
            id="natrium"
            name="natrium"
            value={formData.natrium}
            onChange={handleChange}
            placeholder="예: 1"
          />
        </div>
        <div className="direct-input-group">
          <label htmlFor="sugar">당 (g)</label>
          <input
            type="number"
            id="sugar"
            name="sugar"
            value={formData.sugar}
            onChange={handleChange}
            placeholder="예: 10"
          />
        </div>
        <button type="submit" className="direct-input-submit">
          제출
        </button>
      </form>
    </div>
  );
};

export default DirectInputPage;
