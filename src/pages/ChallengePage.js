import React, { useState, useRef } from 'react';
// import { useNavigate } from 'react-router-dom';
import Calendar from 'react-calendar';
import styled from 'styled-components';
import 'react-calendar/dist/Calendar.css';
import habitIcon from "../img/habit-icon.svg";
// import back from "../img/back.svg";
import './ChallengePage.css'
import left from "../img/left.svg";
import right from "../img/right.svg";

const StyledCalendar = styled(Calendar)`
  width: 100%; /* 캘린더를 부모 요소의 너비에 맞게 설정 */
  max-width: 600px; /* 캘린더의 최대 너비를 제한 */
  height: 100%; /* 캘린더 높이 비율 */
  min-height: 500px; /* 최소 높이 설정 */
//   padding: 20px; /* 내부 여백 */
  height: 150%;
  margin: 0 auto; /* 중앙 정렬 */
  // border: 1.5px solid #00C5A1;
  // border-radius: 2%;
  // border: none; /* 기본 테두리 제거 */
//   box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* 그림자 추가 (선택 사항) */

.react-calendar {
    border: none;
    border-radius: 0 0 10px 10px; 
  }

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

  react-calendar__month-view__weekdays__weekday {
    border: none;
  }

  .react-calendar__tile--highlight {
    background-color: #c5f5d1; /* 주간 챌린지 달성 하이라이트 */
  }

  .react-calendar__navigation {
    display: flex; /* flex를 제거하고 버튼 크기 고정 */
    background-color: #00C5A1;
    color: white;
  }

  .tile-icon {
    position: absolute;
    bottom: 5px;
    right: 5px;
    font-size: 14px;
    color: #00C5A1;
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
    color: white;
  }

  button {
    width: auto;
    // min-width: 70px;
  }

  .react-calendar__navigation__arrow {
    background-color: transparent;
    border: none;
    color: white;
  }

  /* 점선 제거 */
.react-calendar__month-view__weekdays {
  border: none !important; /* 요일 헤더 컨테이너 경계선 제거 */
  display: flex; /* 플렉스 정렬 */
  align-items: center; /* 수직 중앙 정렬 */
  justify-content: space-around; /* 요일 간 간격 균등 배분 */
  height: 50px; /* 요일 라벨 높이 설정 */
  background-color: #f5f5f5; /* 선택적으로 배경색 추가 */
  // margin-top: 5px;
  // margin-bottom: 5px;
  height: 50px;
}

.react-calendar__month-view__weekdays__weekday {
  border: none !important; /* 각 요일 셀 경계선 제거 */
  outline: none !important; /* 포커스 점선 제거 */
  text-transform: uppercase; /* 영어 약자를 대문자로 */
  font-weight: bold; /* 강조 */
}

/* 요일 셀 스타일 */
.react-calendar__month-view__weekdays__weekday abbr {
  text-decoration: none; /* 밑줄 제거 */
}

/* 캘린더 전체 스타일 */
.react-calendar {
  border: none; /* 캘린더 외부 테두리 제거 */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* 그림자 효과 */
  border-radius: 10px; /* 둥근 모서리 */
}

`;


const ChallengePage = () => {
    // const navigate = useNavigate();
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

  const handleDayFormat = (locale, date) => {
    return date.getDate(); // 날짜만 반환
  };

  const [activeStartDate, setActiveStartDate] = useState(new Date()); // 활성화된 날짜

  // 이전 달로 이동
  const handlePrevMonth = () => {
    const prevMonth = new Date(activeStartDate);
    prevMonth.setMonth(activeStartDate.getMonth() - 1);
    setActiveStartDate(prevMonth);
  };

  // 다음 달로 이동
  const handleNextMonth = () => {
    const nextMonth = new Date(activeStartDate);
    nextMonth.setMonth(activeStartDate.getMonth() + 1);
    setActiveStartDate(nextMonth);
  };

  const fileInputRef = useRef(null);

  const handleCameraClick = () => {
    fileInputRef.current.click(); // 파일 입력 창 열기
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log('Captured file:', file);
      alert(`사진이 선택되었습니다: ${file.name}`);
    }
  };

  return (
    <div className='challengePage'>
      <div className='top'>
        {/* <img
                className="settings-back-icon"
                alt="Back"
                src={back}
                onClick={() => navigate(-1)} // 뒤로가기
              /> */}
        <h1 className='title'>챌린지</h1>
      </div>
      <div className="App">
        <div className='manage'>
          {/* <div className="settings-header">
            <img
              className="settings-back-icon"
              alt="Back"
              src={back}
              onClick={() => navigate(-1)} // 뒤로가기
            />
            <span className="settings-title"></span>
          </div>
          <h1>챌린지 관리</h1> */}
            {/* 커스텀 네비게이션 */}
          <div className="custom-header">
            <div className='month'>
              <button onClick={handlePrevMonth} className="nav-button"><img src={left} alt='prev'></img></button>
              <span className="month-label">{activeStartDate.getMonth() + 1}월</span>
              <button onClick={handleNextMonth} className="nav-button"><img src={right} alt='next'></img></button>
            </div>
            <button className="camera-button" onClick={handleCameraClick}>📷</button> {/* 카메라 버튼 */}
            <input
            type="file"
            accept="image/*"
            capture="camera" // 카메라 호출
            style={{ display: 'none' }} // 숨겨진 input
            ref={fileInputRef}
            onChange={handleFileChange}
          />
          </div>
          <StyledCalendar
            locale="en-US" // 영어 약자로 표시
            activeStartDate={activeStartDate} // 활성화된 시작 날짜
            onActiveStartDateChange={({ activeStartDate }) => setActiveStartDate(activeStartDate)}
            onChange={handleDateChange}
            value={date}
            tileContent={tileContent} // 날짜별 아이콘 표시
            tileClassName={tileClassName} // 주간 달성 여부 하이라이트
            formatDay={handleDayFormat} // 날짜 포맷 수정
            showNavigation={false}
          />
        </div>
      </div>
    </div>
  );
};

export default ChallengePage;
