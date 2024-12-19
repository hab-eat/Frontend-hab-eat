import { useEffect, useState } from 'react';
import './NutritionInfo.css';
import Api from '../api';

const NutritionInfo = ({ selectedDate }) => {
  const [targetNutrients, setTargetNutrients] = useState({
    kcal: 0,
    carbohydrate: 0,
    protein: 0,
    fat: 0,
    natrium: 0,
    cholesterol: 0,
    sugar: 0,
  });

  const [dietsStats, setDietsStats] = useState({
    kcal: 0,
    carbohydrate: 0,
    protein: 0,
    fat: 0,
    natrium: 0,
    cholesterol: 0,
    sugar: 0,
  });

  const [error, setError] = useState('');

  const fetchNutrientData = async () => {
    try {
      const dateString = selectedDate.toISOString().slice(0, 10);
      const targetNutrientsRes = await Api.getTargetNutrients();
      const dietsStatsRes = await Api.getDietsStats(dateString);

      setTargetNutrients(targetNutrientsRes);

      if (!dietsStatsRes) {
        setDietsStats({
          kcal: 0,
          carbohydrate: 0,
          protein: 0,
          fat: 0,
          natrium: 0,
          cholesterol: 0,
          sugar: 0,
        });
      } else {
        setDietsStats(dietsStatsRes);
      }
    } catch (err) {
      setError(err.message);
      console.error('영양 정보 가져오기 실패:', err);
    }
  };

  useEffect(() => {
    fetchNutrientData();
  }, [selectedDate]);

  if (error) {
    return <p className="error-message">영양 정보 가져오기 실패: {error}</p>;
  }

  return (
    <div className="nutrition-info">
      {
        <>
          <p>
            칼로리: <b>{Math.round(dietsStats.kcal)}</b>/
            <b>{Math.round(targetNutrients.kcal)}</b> kcal
          </p>
          <p>
            탄수화물: <b>{Math.round(dietsStats.carbohydrate)}</b>/
            <b>{Math.round(targetNutrients.carbohydrate)}</b>g | 단백질:{' '}
            <b>{Math.round(dietsStats.protein)}</b>/
            <b>{Math.round(targetNutrients.protein)}</b>g
          </p>
          <p>
            지방: <b>{Math.round(dietsStats.fat)}</b>/
            <b>{Math.round(targetNutrients.fat)}</b>g | 나트륨:{' '}
            <b>{Math.round(dietsStats.natrium)}</b>/
            <b>{Math.round(targetNutrients.natrium)}</b>mg
          </p>
          <p>
            콜레스테롤: <b>{Math.round(dietsStats.cholesterol)}</b>/
            <b>{Math.round(targetNutrients.cholesterol)}</b>mg | 당:{' '}
            <b>{Math.round(dietsStats.sugar)}</b>/<b>{Math.round(targetNutrients.sugar)}</b>
            g
          </p>
        </>
      }
    </div>
  );
};

export default NutritionInfo;
