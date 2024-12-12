// import React, { useState, useEffect, useRef } from 'react';
// import { useLocation } from 'react-router-dom';
// import Calendar from 'react-calendar';
// import styled from 'styled-components';
// import 'react-calendar/dist/Calendar.css';
// import habitIcon from "../img/habit-icon.svg";
// import './ChallengePage.css'
// import left from "../img/left.svg";
// import right from "../img/right.svg";

// const StyledCalendar = styled(Calendar)`
//   width: 100%; /* 캘린더를 부모 요소의 너비에 맞게 설정 */
//   max-width: 600px; /* 캘린더의 최대 너비를 제한 */
//   height: 100%; /* 캘린더 높이 비율 */
//   min-height: 500px; /* 최소 높이 설정 */
// //   padding: 20px; /* 내부 여백 */
//   height: 150%;
//   margin: 0 auto; /* 중앙 정렬 */
//   // border: 1.5px solid #00C5A1;
//   // border-radius: 2%;
//   // border: none; /* 기본 테두리 제거 */
// //   box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* 그림자 추가 (선택 사항) */

// .react-calendar {
//     border: none;
//     border-radius: 0 0 10px 10px; 
//   }

//   .react-calendar__tile {
//     background-color: #fdfdfd;
//     color: #8E8E8E;
//     height: 70px; /* 타일의 높이를 늘림 */
//     position: relative; /* 아이콘을 위해 상대 위치 설정 */
//     display: flex;
//     flex-direction: column;
//     justify-content: space-between;
//   }

//   .react-calendar__month-view__days__day {
//     height: 70px; /* 일별 셀 높이 */
//   }

//   react-calendar__month-view__weekdays__weekday {
//     border: none;
//   }

//   .react-calendar__tile--highlight {
//     background-color: #c5f5d1; /* 주간 챌린지 달성 하이라이트 */
//   }

//   .react-calendar__navigation {
//     display: flex; /* flex를 제거하고 버튼 크기 고정 */
//     background-color: #00C5A1;
//     color: white;
//   }

//   .tile-icon {
//     position: absolute;
//     bottom: 5px;
//     right: 5px;
//     font-size: 14px;
//     color: #00C5A1;
//   }

//   .react-calendar__tile--now {
//     background-color:  #00C5A1;
//     font-weight: bold;
//     color: #fdfdfd;
//   }

//   .react-calendar__tile--active {
//     // background-color: #00C5A1;
//     color: white;
//   }

//   .react-calendar__navigation__label {
//     font-size: 16px;
//     font-weight: bold;
//     color: white;
//   }

//   button {
//     width: auto;
//     // min-width: 70px;
//   }

//   .react-calendar__navigation__arrow {
//     background-color: transparent;
//     border: none;
//     color: white;
//   }

//   /* 점선 제거 */
// .react-calendar__month-view__weekdays {
//   border: none !important; /* 요일 헤더 컨테이너 경계선 제거 */
//   display: flex; /* 플렉스 정렬 */
//   align-items: center; /* 수직 중앙 정렬 */
//   justify-content: space-around; /* 요일 간 간격 균등 배분 */
//   height: 50px; /* 요일 라벨 높이 설정 */
//   background-color: #f5f5f5; /* 선택적으로 배경색 추가 */
//   // margin-top: 5px;
//   // margin-bottom: 5px;
//   height: 50px;
// }

// .react-calendar__month-view__weekdays__weekday {
//   border: none !important; /* 각 요일 셀 경계선 제거 */
//   outline: none !important; /* 포커스 점선 제거 */
//   text-transform: uppercase; /* 영어 약자를 대문자로 */
//   font-weight: bold; /* 강조 */
// }

// /* 요일 셀 스타일 */
// .react-calendar__month-view__weekdays__weekday abbr {
//   text-decoration: none; /* 밑줄 제거 */
// }

// /* 캘린더 전체 스타일 */
// .react-calendar {
//   border: none; /* 캘린더 외부 테두리 제거 */
//   box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* 그림자 효과 */
//   border-radius: 10px; /* 둥근 모서리 */
// }

// `;

// function getMonthWeeks(month, year) {
//   const adjustedMonth = month - 1; // 월을 0-based로 변환

//   const firstDayOfMonth = new Date(year, adjustedMonth, 1);
//   const lastDayOfMonth = new Date(year, adjustedMonth + 1, 0); // 해당 월의 마지막 날

//   const weeks = [];
//   let startOfWeek = new Date(firstDayOfMonth);
//   const dayOfWeek = startOfWeek.getDay();

//   // 첫 번째 월요일로 시작
//   const diffToMonday = dayOfWeek === 0 ? 1 : 7 - dayOfWeek + 1;
//   startOfWeek.setDate(firstDayOfMonth.getDate() + diffToMonday);
//   startOfWeek.setHours(0, 0, 0, 0);
//   if (startOfWeek.getDate() > 1) {
//     const previousSunday = new Date(startOfWeek);
//     previousSunday.setDate(startOfWeek.getDate() - 7); // 첫 번째 월요일에서 7일 전으로 이동
//     previousSunday.setHours(23, 59, 59, 999); // 해당 일요일의 자정으로 설정
//     startOfWeek = previousSunday; // 첫 번째 월요일 전 일요일을 시작으로 설정
//   }

//   // 주별로 계산
//   while (
//     startOfWeek.getMonth() === adjustedMonth ||
//     startOfWeek <= lastDayOfMonth
//   ) {
//     // 각 주의 마지막 일요일 구하기
//     const endOfWeek = new Date(startOfWeek);
//     endOfWeek.setDate(startOfWeek.getDate() + 6);
//     endOfWeek.setHours(23, 59, 59, 999);

//     // 마지막 일요일이 해당 월을 넘지 않도록 보정
//     if (endOfWeek.getMonth() > adjustedMonth) {
//       // 만약 마지막 일요일이 해당 월을 넘어가면, 그 주는 다음 달까지 포함
//       endOfWeek.setDate(endOfWeek.getDate()); // 3월로 넘어가지 않게
//     }

//     // 주를 추가
//     weeks.push({
//       startOfWeek: new Date(startOfWeek),
//       endOfWeek: new Date(endOfWeek),
//     });

//     // 다음 주의 월요일로 이동
//     startOfWeek.setDate(startOfWeek.getDate() + 7);
//   }

//   return weeks;
// }

// // 예시: 2024년 2월 (1-based input, 2를 넣으면 2월을 계산)
// const monthWeeks = getMonthWeeks(12, 2024); // 2를 넣으면 2월을 계산
// monthWeeks.forEach((week, index) => {
//   console.log(
//     `Week ${
//       index + 1
//     }: ${week.startOfWeek.toLocaleDateString()} ~ ${week.endOfWeek.toLocaleDateString()}`
//   );
// });

// const fetchChallengeData = async (id, startDate, endDate) => {
//   const API_URL = process.env.REACT_APP_API_URL;
//   const TOKEN = process.env.REACT_APP_API_TOKEN;

//   try {
//     // API 호출
//     const response = await fetch(
//       `${API_URL}challenges/${id}/certification-logs?startDate=${startDate}&endDate=${endDate}`,
//       {
//         method: 'GET',
//         headers: {
//           'Authorization': `Bearer ${TOKEN}`,
//           'Content-Type': 'application/json',
//         },
//       }
//     );

//     // HTTP 응답 검증
//     if (!response.ok) {
//       throw new Error(`Failed to fetch challenge data: ${response.status}`);
//     }

//     // JSON 데이터 파싱
//     const data = await response.json();
//     console.log(data);
//     return data;
//   } catch (error) {
//     console.error('Error fetching challenge data:', error);
//     throw error; // 호출한 쪽에서 에러를 처리할 수 있도록 재전달
//   }
// };


// const ChallengePage = () => {
//     // const navigate = useNavigate();
//   const [date, setDate] = React.useState(new Date());
//   const location = useLocation();
//   const { challengeId, month, year } = location.state; // 전달받은 데이터
//   // console.log("ChallengeId:", challengeId);
//   // console.log("Input month:", month); // month 값 확인
//   // console.log("Input year:", year);   // year 값 확인
//   const [weeklyLogs, setWeeklyLogs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [activeStartDate, setActiveStartDate] = useState(new Date()); // 활성화된 날짜
//   const fileInputRef = useRef(null);
//   const [logMap, setLogMap] = useState({});
//   const [weekStatusMap, setWeekStatusMap] = useState({}); // 주 상태를 저장할 맵

//   useEffect(() => {
//     // 주 상태 맵 생성
//     const newWeekStatusMap = {};
  
//     weeklyLogs.forEach((weekArray, index) => {
//       if (weekArray.length > 0) {
//         weekArray.forEach((weekLog) => {
//           const startOfWeek = new Date(weekLog.startDate).toISOString().split('T')[0]; // 주의 시작 날짜
//           newWeekStatusMap[startOfWeek] = weekLog.status; // 주의 상태 저장
//         });
//       }
//     });
  
//     console.log("Generated WeekStatusMap:", newWeekStatusMap);
//     setWeekStatusMap(newWeekStatusMap);
//   }, [weeklyLogs]);
  
//   useEffect(() => {
//     const fetchWeeklyLogs = async () => {
//       try {
//         const weeks = getMonthWeeks(month, year); // 월의 주 계산
//         const logs = await Promise.all(
//           weeks.map(({ startOfWeek, endOfWeek }) => {
//             const startDate = startOfWeek.toISOString().split('T')[0];
//             const endDate = endOfWeek.toISOString().split('T')[0];
//             return fetchChallengeData(challengeId, startDate, endDate); // API 호출
//           })
//         );

//         setWeeklyLogs(logs); // 모든 주의 로그 저장
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchWeeklyLogs();
//   }, [challengeId, month, year]);

//   useEffect(() => {
//     const newLogMap = {};
//     console.log("Weekly Logs:", weeklyLogs);
  
//     weeklyLogs.forEach((weekArray) => {
//       if (weekArray.length > 0) {
//         weekArray.forEach((weekLog) => {
//           if (weekLog && weekLog.challengeCertificationLogs) {
//             weekLog.challengeCertificationLogs.forEach((log) => {
//               const utcDate = new Date(log.date);
//               const dateKey = `${utcDate.getFullYear()}-${String(
//                 utcDate.getMonth() + 1
//               ).padStart(2, '0')}-${String(utcDate.getDate()).padStart(2, '0')}`; // 로컬 시간 기준 YYYY-MM-DD
//               newLogMap[dateKey] = true;
//             });
//           }
//         });
//       }
//     });
  
//     console.log("Generated LogMap:", newLogMap); // logMap 확인
//     setLogMap(newLogMap); // `logMap` 상태 업데이트
//   }, [weeklyLogs]); // weeklyLogs가 변경될 때마다 실행
  

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error: {error}</p>;
//   const handleDateChange = (newDate) => {
//     setDate(newDate);
//   };

//   const formatDateToKey = (date) => {
//     return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
//   };

//   const isWeeklyChallengeCompleted = (date) => {
//     const startOfWeek = new Date(date);
//     const dayOfWeek = startOfWeek.getDay(); // 현재 요일(0: 일요일, 1: 월요일, ..., 6: 토요일)
//     const daysToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek; // 일요일(0)이면 -6, 나머지는 1 - dayOfWeek
  
//     startOfWeek.setDate(startOfWeek.getDate() + daysToMonday); // 월요일로 설정
  
//     const endOfWeek = new Date(startOfWeek);
//     endOfWeek.setDate(endOfWeek.getDate() + 6); // 해당 주의 일요일
  
//     let completedDays = 0;
//     for (
//       let d = new Date(startOfWeek);
//       d <= endOfWeek;
//       d.setDate(d.getDate() + 1)
//     ) {
//       const dateKey = formatDateToKey(d); // 로컬 시간을 기반으로 날짜를 생성
//       if (logMap[dateKey]) {
//         completedDays += 1;
//       }
//     }
  
//     return completedDays >= 5; // 예: 5일 이상 달성해야 주간 챌린지 달성
//   };
  
//   const tileClassName = ({ date, view }) => {
//     if (view === 'month') {
//       const dateKey = formatDateToKey(date); // 로컬 시간을 기반으로 날짜 생성
//       if (logMap[dateKey]) {
//         return 'react-calendar__tile--highlight';
//       }
//     }
//     return '';
//   };
  
//   const tileContent = ({ date, view }) => {
//     if (view === 'month') {
//       const dateKey = formatDateToKey(date); // 로컬 시간을 기반으로 날짜 생성
//       if (logMap[dateKey]) {
//         return (
//           <img
//             src={habitIcon}
//             alt="Challenge Completed"
//             className="tile-icon"
//           />
//         );
//       }
//     }
//     return null;
//   };

//   const handleDayFormat = (locale, date) => {
//     return date.getDate(); // 날짜만 반환
//   };


//   // 이전 달로 이동
//   const handlePrevMonth = () => {
//     const prevMonth = new Date(activeStartDate);
//     prevMonth.setMonth(activeStartDate.getMonth() - 1);
//     setActiveStartDate(prevMonth);
//   };

//   // 다음 달로 이동
//   const handleNextMonth = () => {
//     const nextMonth = new Date(activeStartDate);
//     nextMonth.setMonth(activeStartDate.getMonth() + 1);
//     setActiveStartDate(nextMonth);
//   };

//   const handleCameraClick = () => {
//     fileInputRef.current.click(); // 파일 입력 창 열기
//   };

//   const handleFileChange = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       console.log('Captured file:', file);
//       alert(`사진이 선택되었습니다: ${file.name}`);
//     }
//   };

//   return (
//     <div className='challengePage'>
//       <div className='top'>
//         <h1 className='title'>챌린지</h1>
//       </div>
//       <div className="App">
//         <div className='manage'>
//           <div className="custom-header">
//             <div className='month'>
//               <button onClick={handlePrevMonth} className="nav-button"><img src={left} alt='prev'></img></button>
//               <span className="month-label">{activeStartDate.getMonth() + 1}월</span>
//               <button onClick={handleNextMonth} className="nav-button"><img src={right} alt='next'></img></button>
//             </div>
//             <button className="camera-button" onClick={handleCameraClick}>📷</button> {/* 카메라 버튼 */}
//             <input
//             type="file"
//             accept="image/*"
//             capture="camera" // 카메라 호출
//             style={{ display: 'none' }} // 숨겨진 input
//             ref={fileInputRef}
//             onChange={handleFileChange}
//           />
//           </div>
//           <StyledCalendar
//             locale="en-GB" // 영어 약자로 표시
//             activeStartDate={activeStartDate} // 활성화된 시작 날짜
//             onActiveStartDateChange={({ activeStartDate }) => setActiveStartDate(activeStartDate)}
//             onChange={handleDateChange}
//             value={date}
//             tileContent={tileContent} // 날짜별 아이콘 표시
//             tileClassName={tileClassName} // 주간 달성 여부 하이라이트
//             formatDay={handleDayFormat} // 날짜 포맷 수정
//             showNavigation={false}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ChallengePage;

import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Calendar from 'react-calendar';
import styled from 'styled-components';
import 'react-calendar/dist/Calendar.css';
import habitIcon from "../img/success-icon.svg";
import './ChallengePage.css';
import left from "../img/left.svg";
import right from "../img/right.svg";
import medalIcon from "../img/medal.svg";
import cameraIcon from "../img/greenCamera.svg"
import NavigationBar from '../components/NavigationBar';

// Styled Calendar
const StyledCalendar = styled(Calendar)`
  width: 100%;
  max-width: 600px;
  min-height: 500px;
  margin: 0 auto;

  .react-calendar__tile {
    background-color: #fdfdfd;
    color: #8E8E8E;
    height: 70px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .react-calendar__tile--highlight {
    background-color: #c5f5d1;
  }

  .react-calendar__tile--now {
    background-color: #00C5A1;
    font-weight: bold;
    color: #fdfdfd;
  }

  .tile-icon {
    position: absolute;
    bottom: 5px;
    right: 5px;
    font-size: 14px;
  }

  .react-calendar__navigation {
    display: flex;
    background-color: #00C5A1;
    color: white;
  }

  .react-calendar__navigation__label {
    font-size: 16px;
    font-weight: bold;
  }
`;

// Helper to calculate weeks of a month
const getMonthWeeks = (month, year) => {
  const firstDay = new Date(year, month - 1, 1);
  const lastDay = new Date(year, month, 0);
  const weeks = [];

  let start = new Date(firstDay);
  start.setDate(start.getDate() - (start.getDay() || 7) + 1);

  while (start <= lastDay) {
    const end = new Date(start);
    end.setDate(end.getDate() + 6);
    weeks.push({ startOfWeek: new Date(start), endOfWeek: new Date(end) });
    start.setDate(start.getDate() + 7);
  }

  return weeks;
};

// Fetch data from API
const fetchChallengeData = async (id, startDate, endDate) => {
  const API_URL = process.env.REACT_APP_API_URL;
  const TOKEN = process.env.REACT_APP_API_TOKEN;

  const response = await fetch(
    `${API_URL}challenges/${id}/certification-logs?startDate=${startDate}&endDate=${endDate}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        'Content-Type': 'application/json',
      },
    }
  );

  if (!response.ok) throw new Error(`Failed to fetch data: ${response.status}`);
  return response.json();
};

const ChallengePage = () => {
  const [date, setDate] = useState(new Date());
  const location = useLocation();
  const { challengeId, month, year } = location.state;
  const [logMap, setLogMap] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);
  const [activeStartDate, setActiveStartDate] = useState(new Date());
  const [weekStatusMap, setWeekStatusMap] = useState({}); // 주차별 status 저장

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const weeks = getMonthWeeks(month, year);
        const logs = await Promise.all(
          weeks.map(({ startOfWeek, endOfWeek }) =>
            fetchChallengeData(
              challengeId,
              startOfWeek.toISOString().split('T')[0],
              endOfWeek.toISOString().split('T')[0]
            )
          )
        );

        const newLogMap = {};
        logs.flat().forEach((weekLog) => {
          if (weekLog && weekLog.challengeCertificationLogs) {
            weekLog.challengeCertificationLogs.forEach((log) => {
              const dateKey = log.date.split('T')[0]; // UTC 날짜만 저장
              newLogMap[dateKey] = true;
            });
          }
        });

        setLogMap(newLogMap);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, [challengeId, month, year]);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const weeks = getMonthWeeks(month, year);
        const logs = await Promise.all(
          weeks.map(({ startOfWeek, endOfWeek }) =>
            fetchChallengeData(
              challengeId,
              startOfWeek.toISOString().split('T')[0],
              endOfWeek.toISOString().split('T')[0]
            )
          )
        );
  
        const newWeekStatusMap = {}; // 주차별 status 저장
        logs.flat().forEach((weekLog) => {
          if (weekLog && weekLog.status) {
            const startOfWeekKey = weekLog.startDate.split('T')[0]; // 주차 시작 날짜를 키로 사용
            newWeekStatusMap[startOfWeekKey] = weekLog.status; // 주차 상태 저장 (true/false)
          }
        });
  
        setWeekStatusMap(newWeekStatusMap); // 주차별 status 상태 저장
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchLogs();
  }, [challengeId, month, year]);
  
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  

  const formatDateKey = (date) => {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  };

  // const tileClassName = ({ date }) => {
  //   if (date.getDay() !== 1) return ''; // 월요일만 체크
  //   const startOfWeek = new Date(date);
  //   startOfWeek.setDate(date.getDate() - date.getDay() + 1); // 주의 월요일로 설정
  
  //   const startOfWeekKey = formatDateKey(startOfWeek); // 주차 시작 날짜를 키로 생성
  //   return weekStatusMap[startOfWeekKey] ? 'react-calendar__tile--highlight' : '';
  // };

  const tileContent = ({ date }) => {
    if (date.getDay() === 1) {
      const startOfWeek = new Date(date);
      startOfWeek.setDate(date.getDate() - date.getDay() + 1); // 주의 월요일로 설정
    
      const startOfWeekKey = formatDateKey(startOfWeek); // 주차 시작 날짜를 키로 생성
      if (weekStatusMap[startOfWeekKey]) {
        return <img src={medalIcon} alt="Completed"/>;
      }
      return null;
    }
    const dateKey = formatDateKey(date);
    if (logMap[dateKey]) {
      return <img src={habitIcon} alt="Challenge Completed"/>;
    }
    return null;
  };

  const handleCameraClick = () => fileInputRef.current.click();
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) alert(`사진이 선택되었습니다: ${file.name}`);
  };

  return (
    <div className="challengePage">
      <div className="top">
        <h1 className="title">챌린지</h1>
      </div>
      <div className="App">
        <div className="manage">
          <div className="custom-header">
            <div className="month">
              <button onClick={() => setActiveStartDate(new Date(activeStartDate.setMonth(activeStartDate.getMonth() - 1)))} className="nav-button">
                <img src={left} alt="prev" />
              </button>
              <span className="month-label">{activeStartDate.getMonth() + 1}월</span>
              <button onClick={() => setActiveStartDate(new Date(activeStartDate.setMonth(activeStartDate.getMonth() + 1)))} className="nav-button">
                <img src={right} alt="next" />
              </button>
            </div>
            <button className="camera-button" onClick={handleCameraClick}>
              <img src={cameraIcon} alt="camera"></img>
            </button>
            <input type="file" accept="image/*" capture="camera" style={{ display: 'none' }} ref={fileInputRef} onChange={handleFileChange} />
          </div>
          <StyledCalendar
            locale="en-GB"
            activeStartDate={activeStartDate}
            onChange={setDate}
            value={date}
            tileContent={tileContent}
            // tileClassName={tileClassName}
            showNavigation={false}
          />
        </div>
      </div>
      <NavigationBar />
    </div>
  );
};

export default ChallengePage;
