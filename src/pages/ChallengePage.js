import React from 'react';
import { useNavigate } from 'react-router-dom';
import Calendar from 'react-calendar';
import styled from 'styled-components';
import 'react-calendar/dist/Calendar.css';
import habitIcon from "../img/habit-icon.svg";
import back from "../img/back.svg";

const StyledCalendar = styled(Calendar)`
  width: 100%; /* 캘린더를 부모 요소의 너비에 맞게 설정 */
  max-width: 600px; /* 캘린더의 최대 너비를 제한 */
  height: 100%; /* 캘린더 높이 비율 */
  min-height: 500px; /* 최소 높이 설정 */
//   padding: 20px; /* 내부 여백 */
  height: 150%;
  margin: 0 auto; /* 중앙 정렬 */
  border: none; /* 기본 테두리 제거 */
//   box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* 그림자 추가 (선택 사항) */

  .react-calendar__tile {
    background-color: #fdfdfd;
    color: #8E8E8E;
    height: 70px; /* 타일의 높이를 늘림 */
    position: relative; /* 아이콘을 위해 상대 위치 설정 */
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .react-calendar__month-view__days__day {
    height: 70px; /* 일별 셀 높이 */
  }

  .react-calendar__tile--highlight {
    background-color: #c5f5d1; /* 주간 챌린지 달성 하이라이트 */
  }

  .react-calendar__navigation {
  display: flex; /* flex를 제거하고 버튼 크기 고정 */

  .tile-icon {
    position: absolute;
    bottom: 5px;
    right: 5px;
    font-size: 14px;
    color: #00C5A1;
  }
  
}

  .react-calendar__tile--now {
    background-color:  #00C5A1;
    font-weight: bold;
    color: #fdfdfd;
  }

  .react-calendar__tile--active {
    // background-color: #00C5A1;
    color: white;
  }

  .react-calendar__navigation__label {
    font-size: 16px;
    font-weight: bold;
    color: #00C5A1;
  }

  button {
    width: auto;
    // min-width: 70px;
  }

  .react-calendar__navigation__arrow {
    background-color: transparent;
    border: none;
    color: #00C5A1;
  }
`;


const ChallengePage = () => {
    const navigate = useNavigate();
  const [date, setDate] = React.useState(new Date());

  // 예제: 각 날짜의 챌린지 달성 여부 데이터
  const dailyChallenges = {
    '2024-12-01': true,
    '2024-12-02': true,
    '2024-12-03': false,
    '2024-12-04': true,
    '2024-12-05': true,
    '2024-12-06': true,
    '2024-12-07': false,
    '2024-12-08': true,
    '2024-12-19': true,
  };

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  const formatDateToKey = (date) => {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  };

  const isWeeklyChallengeCompleted = (date) => {
    const startOfWeek = new Date(date);
    const dayOfWeek = startOfWeek.getDay(); // 현재 요일(0: 일요일, 1: 월요일, ..., 6: 토요일)
    const daysToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek; // 일요일(0)이면 -6, 나머지는 1 - dayOfWeek
  
    startOfWeek.setDate(startOfWeek.getDate() + daysToMonday); // 월요일로 설정
  
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(endOfWeek.getDate() + 6); // 해당 주의 일요일
  
    let completedDays = 0;
    for (
      let d = new Date(startOfWeek);
      d <= endOfWeek;
      d.setDate(d.getDate() + 1)
    ) {
      const dateKey = formatDateToKey(d); // 로컬 시간을 기반으로 날짜를 생성
      if (dailyChallenges[dateKey]) {
        completedDays += 1;
      }
    }
  
    return completedDays >= 5; // 예: 5일 이상 달성해야 주간 챌린지 달성
  };
  

  // 각 날짜의 스타일 결정
  const tileClassName = ({ date, view }) => {
    if (view === 'month' && isWeeklyChallengeCompleted(date)) {
        // console.log(date);
      return 'react-calendar__tile--highlight';
    }
    return '';
  };

  // 각 날짜에 아이콘 추가
  const tileContent = ({ date, view }) => {
    if (view === 'month') {
    //   const dateKey = date.toISOString().split('T')[0]; // YYYY-MM-DD 형식
    const dateKey = formatDateToKey(date); // 로컬 시간을 기반으로 날짜를 생성
    //   console.log(dateKey);
      if (dailyChallenges[dateKey]) {
        return <img
        src={habitIcon} // 성공한 날짜에 habitIcon 사용
        alt="챌린지 달성"
      />; // 달성 아이콘
      }
    //   return <span className="tile-icon">✖</span>; // 미달성 아이콘
    }
    return null;
  };

  return (
    <div className="App">
        <div className='div'>
        <div className="settings-header">
          <img
            className="settings-back-icon"
            alt="Back"
            src={back}
            onClick={() => navigate(-1)} // 뒤로가기
          />
          <span className="settings-title"></span>
        </div>
        <h1>챌린지 관리</h1>
        </div>
      <StyledCalendar
        onChange={handleDateChange}
        value={date}
        tileContent={tileContent} // 날짜별 아이콘 표시
        tileClassName={tileClassName} // 주간 달성 여부 하이라이트
      />
    </div>
  );
};

export default ChallengePage;
