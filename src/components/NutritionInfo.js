import { useEffect, useState } from 'react';
import './NutritionInfo.css';

const NutritionInfo = () => {
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

  if (error) {
    return <p className="error-message">영양 정보 가져오기 실패: {error}</p>;
  }

  return (
    <div className="nutrition-info">
      {
        <>
          <p>
            칼로리: <b>1500</b>/<b>{Math.round(nutrients.kcal)}</b> kcal
          </p>
          <p>
            탄수화물: <b>100</b>/<b>{Math.round(nutrients.carbohydrate)}</b>g |
            단백질: <b>50</b>/<b>{Math.round(nutrients.protein)}</b>g
          </p>
          <p>
            지방: <b>20</b>/<b>{Math.round(nutrients.fat)}</b>g | 나트륨:{' '}
            <b>50</b>/<b>{Math.round(nutrients.natrium)}</b>mg
          </p>
          <p>
            콜레스테롤: <b>50</b>/<b>{Math.round(nutrients.cholesterol)}</b>mg |
            당: <b>50</b>/<b>{Math.round(nutrients.sugar)}</b>g
          </p>
        </>
      }
    </div>
  );
};

export default NutritionInfo;
