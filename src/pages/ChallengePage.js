import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Calendar from 'react-calendar';
import styled from 'styled-components';
import 'react-calendar/dist/Calendar.css';
import habitIcon from '../img/success-icon.svg';
import './ChallengePage.css';
import left from '../img/left.svg';
import right from '../img/right.svg';
import medalIcon from '../img/medal.svg';
import cameraIcon from '../img/greenCamera.svg';
import NavigationBar from '../components/NavigationBar';
import Api from '../api';

// Styled Calendar
const StyledCalendar = styled(Calendar)`
  width: 100%;
  max-width: 600px;
  min-height: 500px;
  margin: 0 auto;

  .react-calendar__tile {
    background-color: #fdfdfd;
    color: #8e8e8e;
    height: 70px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .react-calendar__tile--highlight {
    background-color: #c5f5d1;
  }

  .react-calendar__tile--now {
    background-color: #c5f5d1;
    border: 1px soild #00c5a1;
    font-weight: bold;
    color: #000;
  }

  .tile-icon {
    position: absolute;
    bottom: 5px;
    right: 5px;
    font-size: 14px;
  }

  .react-calendar__navigation {
    display: flex;
    background-color: #00c5a1;
    color: white;
  }

  .react-calendar__navigation__label {
    font-size: 16px;
    font-weight: bold;
  }
`;

// Helper to calculate weeks of a month
const getMonthWeeks = (month, year) => {
  // const firstDay = new Date(year, month - 1, 1);
  // const lastDay = new Date(year, month, 0);
  // const weeks = [];

  // let start = new Date(firstDay);
  // start.setDate(start.getDate() - (start.getDay() || 7) + 1);

  // while (start <= lastDay) {
  //   const end = new Date(start);
  //   end.setDate(end.getDate() + 6);
  //   end.setHours(23, 59, 59, 999); // 시간을 명시적으로 23:59:59로 설정
  //   weeks.push({ startOfWeek: new Date(start), endOfWeek: new Date(end) });
  //   start.setDate(start.getDate() + 7);
  // }

  const adjustedMonth = month - 1; // 월을 0-based로 변환

  const firstDayOfMonth = new Date(year, adjustedMonth, 1);
  const lastDayOfMonth = new Date(year, adjustedMonth + 1, 0); // 해당 월의 마지막 날

  const weeks = [];
  let startOfWeek = new Date(firstDayOfMonth);
  const dayOfWeek = startOfWeek.getDay();

  // 첫 번째 월요일로 시작
  const diffToMonday = dayOfWeek === 0 ? 1 : 7 - dayOfWeek + 1;
  startOfWeek.setDate(firstDayOfMonth.getDate() + diffToMonday);
  startOfWeek.setHours(0, 0, 0, 0);
  if (startOfWeek.getDate() > 1) {
    const previousSunday = new Date(startOfWeek);
    previousSunday.setDate(startOfWeek.getDate() - 7); // 첫 번째 월요일에서 7일 전으로 이동
    previousSunday.setHours(23, 59, 59, 999); // 해당 일요일의 자정으로 설정
    startOfWeek = previousSunday; // 첫 번째 월요일 전 일요일을 시작으로 설정
  }

  // 주별로 계산
  while (
    startOfWeek.getMonth() === adjustedMonth ||
    startOfWeek <= lastDayOfMonth
  ) {
    // 각 주의 마지막 일요일 구하기
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    endOfWeek.setHours(23, 59, 59, 999);

    // 마지막 일요일이 해당 월을 넘지 않도록 보정
    if (endOfWeek.getMonth() > adjustedMonth) {
      // 만약 마지막 일요일이 해당 월을 넘어가면, 그 주는 다음 달까지 포함
      endOfWeek.setDate(endOfWeek.getDate()); // 3월로 넘어가지 않게
    }

    // 주를 추가
    weeks.push({
      startOfWeek: new Date(startOfWeek),
      endOfWeek: new Date(endOfWeek),
    });

    // 다음 주의 월요일로 이동
    startOfWeek.setDate(startOfWeek.getDate() + 7);
  }

  return weeks;
};

const toLocalISOString = (date) => {
  return new Date(date.getTime() - date.getTimezoneOffset() * 60000)
    .toISOString()
    .replace('Z', '');
};

// Fetch data from API
const fetchChallengeData = async (id, startDate, endDate) => {
  console.log(startDate);
  console.log(endDate);

  return Api.getChallengeCertificationLogs({ id, startDate, endDate });
};

const ChallengePage = () => {
  const navigate = useNavigate();
  const [date, setDate] = useState(new Date());
  const location = useLocation();
  const { challengeId, name, description, month, year } = location.state;
  const [logMap, setLogMap] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);
  const [activeStartDate, setActiveStartDate] = useState(new Date());
  const [weekStatusMap, setWeekStatusMap] = useState({}); // 주차별 status 저장
  const showCameraButton = challengeId === 5 || challengeId === 6;
  // console.log(name);
  // console.log(description);
  // console.log(month);
  // console.log(year);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const weeks = getMonthWeeks(month, year);
        // endOfWeek에 시간을 명확히 설정
        const weeksWithAdjustedTimes = weeks.map(
          ({ startOfWeek, endOfWeek }) => {
            // endOfWeek를 23:59:59.999로 설정
            console.log(endOfWeek);
            endOfWeek.setHours(23, 59, 59, 999);
            return { startOfWeek, endOfWeek };
          },
        );
        const logs = await Promise.all(
          weeksWithAdjustedTimes.map(({ startOfWeek, endOfWeek }) =>
            fetchChallengeData(
              challengeId,
              startOfWeek.toISOString().split('T')[0],
              // endOfWeek.toISOString()
              toLocalISOString(endOfWeek), // 종료 날짜 (로컬 기준)
            ),
          ),
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
  }, [challengeId, name, description, month, year]);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const weeks = getMonthWeeks(month, year);
        const logs = await Promise.all(
          weeks.map(({ startOfWeek, endOfWeek }) =>
            fetchChallengeData(
              challengeId,
              startOfWeek.toISOString().split('T')[0],
              endOfWeek.toISOString().split('T')[0],
            ),
          ),
        );
        console.log(logs);

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
  }, [challengeId, name, description, month, year]);
  

  if (loading) return <p>LoadingPage</p>;
  if (error) return <p>Error: {error}</p>;

  const formatDateKey = (date) => {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  };

  const tileContent = ({ date }) => {
    if (date.getDay() === 1) {
      const startOfWeek = new Date(date);
      startOfWeek.setDate(date.getDate() - date.getDay() + 1); // 주의 월요일로 설정

      const startOfWeekKey = formatDateKey(startOfWeek); // 주차 시작 날짜를 키로 생성
      const dateKey = formatDateKey(date);
      if (weekStatusMap[startOfWeekKey]) {
        return <img src={medalIcon} alt="Completed" />;
      } else if (logMap[dateKey]) {
        return <img src={habitIcon} alt="Challenge Completed" />;
      }
      return null;
    }
    const dateKey = formatDateKey(date);
    if (logMap[dateKey]) {
      return <img src={habitIcon} alt="Challenge Completed" />;
    }
    return null;
  };

  const handleCameraClick = () => fileInputRef.current.click();
  const handleFileChange = (event) => {
    const id = challengeId;
    const file = event.target.files[0];
    // if (file) alert(`사진이 선택되었습니다: ${file.name}`);
    if (file) {
      navigate(`/challenge/camera`, { state: { file, id, name, description } });
    }
  };

  return (
    <div className="challengePage">
      <div className="top">
        <h1 className="title">챌린지</h1>
      </div>
      <div className="App">
        <div className='challenge-container'>
          <p className="challenge-name">{name}</p>
          <p>|</p>
          <p className="challenge-description">{description}</p>
        </div>
        <div className="manage">
          <div className="custom-header">
            <div className="month">
              <button
                onClick={() =>
                  setActiveStartDate(
                    new Date(
                      activeStartDate.setMonth(activeStartDate.getMonth() - 1),
                    ),
                  )
                }
                className="nav-button"
              >
                <img src={left} alt="prev" />
              </button>
              <span className="month-label">
                {activeStartDate.getMonth() + 1}월
              </span>
              <button
                onClick={() =>
                  setActiveStartDate(
                    new Date(
                      activeStartDate.setMonth(activeStartDate.getMonth() + 1),
                    ),
                  )
                }
                className="nav-button"
              >
                <img src={right} alt="next" />
              </button>
            </div>
            {/* <button className="camera-button" onClick={handleCameraClick}>
              <img src={cameraIcon} alt="camera"></img>
            </button>
            {/* 카메라 버튼 조건부 렌더링 */}
            {showCameraButton && (
              <button className="camera-button" onClick={handleCameraClick}>
                <img src={cameraIcon} alt="camera" />
              </button>
            )}
            <input
              type="file"
              accept="image/*"
              capture="camera"
              style={{ display: 'none' }}
              ref={fileInputRef}
              onChange={handleFileChange}
            />
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