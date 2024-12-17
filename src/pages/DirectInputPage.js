import React, { useState } from 'react';
import './DirectInputPage.css';
;

const DirectInputPage = () => {
  const [formData, setFormData] = useState({
    kcal: '',
    carbohydrate: '',
    protein: '',
    fat: '',
    natrium: '',
    cholestrol: '',
    sugar: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted Data:', formData);
    alert('입력이 완료되었습니다!');
  };

  return (
    <div className="direct-input-container">
      <h1 className="direct-input-title">음식 정보 입력</h1>
      <form onSubmit={handleSubmit} className="direct-input-form">
        <div className="direct-input-group">
          <label htmlFor="kcal">음식명</label>
          <input
            type="text"
            id="kcal"
            name="kcal"
            value={formData.kcal}
            onChange={handleChange}
            placeholder="예: 사과"
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
            placeholder="예: 15"
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
            placeholder="예: 0.1"
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
          <label htmlFor="cholestrol">콜레스테롤 (mg)</label>
          <input
            type="number"
            id="cholestrol"
            name="cholestrol"
            value={formData.cholestrol}
            onChange={handleChange}
            placeholder="예: 0"
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
        <button type="submit" className="direct-input-submit">제출</button>
      </form>
    </div>
  );
};

export default DirectInputPage;
