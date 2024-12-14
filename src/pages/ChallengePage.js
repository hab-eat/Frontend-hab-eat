import React, { useState, useEffect, useRef } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();
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
    const id = challengeId;
    const file = event.target.files[0];
    // if (file) alert(`사진이 선택되었습니다: ${file.name}`);
    if (file) {
      navigate(`/challenge/camera`, { state : {file, id} });
    }
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
