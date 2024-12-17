import { useState } from 'react';
import DatePicker from 'react-datepicker';
import './NutritionCalendar.css';

const NutritionCalendar = ({ selectedDate, setSelectedDate }) => {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const handleCalendarToggle = () => {
    setIsCalendarOpen(!isCalendarOpen);
  };

  const handleDateChange = (date) => {
    date.setHours(date.getHours() + 9); //달력이 하루 씩 밀려 추가함
    setSelectedDate(date);
    setIsCalendarOpen(false);
  };

  return (
    <>
      {/* 달력 버튼 */}
      <div className="calendar-section">
        <span className="selected-date">
          {selectedDate.toLocaleDateString('ko-KR')}
        </span>
        <button className="calendar-button" onClick={handleCalendarToggle}>
          달력
        </button>
      </div>

      {/* 달력 표시 */}
      {isCalendarOpen && (
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          inline
          className="datepicker"
        />
      )}
    </>
  );
};

export default NutritionCalendar;
