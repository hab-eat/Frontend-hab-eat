import React, { useEffect, useState } from 'react';
import './QuantityAdjustPage.css';
import { useLocation } from 'react-router-dom';
import api from '../api';
import * as _ from 'lodash';

const QuantityAdjustPage = () => {
  const location = useLocation();

  const foodId = location.state?.id;
  const foodName = location.state?.name;

  const [servingSize, setServingSize] = useState(0);

  const [amount, setAmount] = useState(0);
  const [kcal, setKcal] = useState(0);
  const [carbohydrate, setCarbohydrate] = useState(0);
  const [protein, setProtein] = useState(0);
  const [fat, setFat] = useState(0);
  const [natrium, setNatrium] = useState(0);
  const [cholesterol, setCholesterol] = useState(0);
  const [sugar, setSugar] = useState(0);
  const [calcium, setCalcium] = useState(0);
  const [phosphorus, setPhosphorus] = useState(0);
  const [kalium, setKalium] = useState(0);
  const [magnesium, setMagnesium] = useState(0);
  const [iron, setIron] = useState(0);
  const [zinc, setZinc] = useState(0);
  const [transfat, setTransfat] = useState(0);

  const fetchFoodNutrients = async () => {
    if (!location.state?.id) return;

    const res = await api.getFood(location.state?.id);

    setServingSize(res.servingSize || 100);
    setAmount(res.amount || 100);
    setKcal(res.kcal || 0);
    setCarbohydrate(res.carbohydrate || 0);
    setProtein(res.protein || 0);
    setFat(res.fat || 0);
    setNatrium(res.natrium || 0);
    setCholesterol(res.cholesterol || 0);
    setSugar(res.sugar || 0);
    setCalcium(res.calcium || 0);
    setPhosphorus(res.phosphorus || 0);
    setKalium(res.kalium || 0);
    setMagnesium(res.magnesium || 0);
    setIron(res.iron || 0);
    setZinc(res.zinc || 0);
    setTransfat(res.transfat || 0);
  };

  useEffect(() => {
    fetchFoodNutrients();
  }, []);

  // 입력 값 핸들러
  const handleChange = async (e) => {
    // 숫자만 입력 허용
    if (/^\d*$/.test(e.target.value)) {
      setServingSize(e.target.value);
    }
  };

  // 입력 완료 핸들러
  const handleSubmit = async () => {
    try {
      const rate = servingSize / amount;

      const dateString = new Date(Date.now() + 9 * 60 * 60 * 1000)
        .toISOString()
        .slice(0, 10);

      await api.postDiets({
        date: dateString,
        amount: servingSize,
        kcal: kcal * rate,
        carbohydrate: carbohydrate * rate,
        sugar: sugar * rate,
        fat: fat * rate,
        protein: protein * rate,
        calcium: calcium * rate,
        phosphorus: phosphorus * rate,
        natrium: natrium * rate,
        kalium: kalium * rate,
        magnesium: magnesium * rate,
        iron: iron * rate,
        zinc: zinc * rate,
        cholesterol: cholesterol * rate,
        transfat: transfat * rate,
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
    } catch (e) {
      alert('식단 업로드에 실패했습니다.');
    }
  };

  return (
    <div className="quantity-adjust-container">
      <h1 className="quantity-adjust-title">{foodName} 양 조절</h1>
      <div className="quantity-input-container">
        <input
          type="text"
          className="quantity-input"
          placeholder="양을 입력하세요 (g)"
          value={servingSize}
          onChange={handleChange}
        />
      </div>
      <button className="quantity-submit-button" onClick={handleSubmit}>
        입력 완료
      </button>
    </div>
  );
};

export default QuantityAdjustPage;
