import React, { useState } from 'react';
import './NutritionPage.css';
import 'react-datepicker/dist/react-datepicker.css';
import NavigationBar from '../components/NavigationBar'; // 네비게이션 바 컴포넌트 가져오기
import LoadingPage from '../pages/LoadingPage';
import NutritionCarmera from '../components/NutritionCarmera';
import NutritionInfo from '../components/NutritionInfo';
import NutritionCalendar from '../components/NutritionCalendar';
import NutritionMeals from '../components/NutritionMeals';

const NutritionPage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date(Date.now()));
  const [isLoading, setLoading] = useState(false);
  if (isLoading) return <LoadingPage />;

  return (
    <div className="nutrition-container">
      <NutritionCalendar
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
      <NutritionInfo selectedDate={selectedDate} />
      <NutritionMeals selectedDate={selectedDate} />
      <NavigationBar
        CarmeraElement={<NutritionCarmera setLoading={setLoading} />}
      />
    </div>
  );
};

export default NutritionPage;
