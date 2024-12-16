import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import './HabitPage.css';
import NavigationBar from '../components/NavigationBar'; // 네비게이션 바 컴포넌트 가져오기

export const HabitPage = () => {
  const navigate = useNavigate();
  // const location = useLocation();
  const API_URL = process.env.REACT_APP_BACKEND_URL;
  const TOKEN = process.env.REACT_APP_API_TOKEN;

  const [availableChallenges, setAvailableChallenges] = useState([]);
  const [ongoingChallenges, setOngoingChallenges] = useState([]);
  const [selectedChallenge, setSelectedChallenge] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [days, setDays] = useState(5);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchChallenges = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const token = `${TOKEN}`; // 로그인 토큰 가져오기
      if (!token)
        throw new Error('로그인 토큰이 없습니다. 다시 로그인해주세요.');

      const response = await fetch(`${API_URL}challenges`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`, // 토큰 포함
          'Content-Type': 'application/json',
        },
        credentials: 'include', // 필요시 쿠키 전송
      });

      if (!response.ok) {
        if (response.status === 401) {
          // 인증 만료 또는 실패 처리
          alert('세션이 만료되었습니다. 다시 로그인해주세요.');
          navigate('/login');
          return;
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      // 데이터 상태 업데이트
      setAvailableChallenges(
        data.availableChallenges.map((challenge) => ({
          id: challenge.id,
          title: challenge.name,
          description: challenge.description,
          targetUserType: challenge.targetUserType,
          type: challenge.type,
        })),
      );

      setOngoingChallenges(
        data.ongingChallenges.map((challenge) => ({
          id: challenge.id,
          name: challenge.name,
          userId: `${TOKEN}`, // 사용자 ID는 토큰에서 가져오거나 백엔드에서 처리
          challengeId: challenge.id,
          challengeType: challenge.type || 'unknown',
          goalDays: challenge.goalDays,
          successDays: challenge.successDays,
          startDate: challenge.startDate,
          endDate: challenge.endDate,
          lastSuccessDate: challenge.lastSuccessDate,
          lastCheckDate: challenge.lastCheckDate,
          status: challenge.status,
        })),
      );
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, [API_URL, TOKEN, navigate]); // 필요한 의존성만 추가

  useEffect(() => {
    fetchChallenges();
  }, [fetchChallenges]);

  const openModal = (challenge) => {
    const today = new Date();
    if (today.getDay() !== 1) {
      alert("챌린지 참여 신청은 월요일에만 가능합니다.");
      return;
    }

    setSelectedChallenge(challenge);
    setIsModalOpen(true);
    setDays(5);
  };

  const closeModal = () => {
    setSelectedChallenge(null);
    setIsModalOpen(false);
  };

  const incrementDays = () => {
    if (days < 7) setDays((prev) => prev + 1);
  };

  const decrementDays = () => {
    if (days > 1) setDays((prev) => prev - 1);
  };

  // const toKoreaISOString = (date) => {
  //   const offsetDate = new Date(date.getTime() + 9 * 60 * 60 * 1000); // UTC+9 보정
  //   const yyyy = offsetDate.getUTCFullYear();
  //   const mm = String(offsetDate.getUTCMonth() + 1).padStart(2, '0'); // 월 (1-based)
  //   const dd = String(offsetDate.getUTCDate()).padStart(2, '0'); // 일
  //   const hh = String(offsetDate.getUTCHours()).padStart(2, '0'); // 시
  //   const min = String(offsetDate.getUTCMinutes()).padStart(2, '0'); // 분
  //   const ss = String(offsetDate.getUTCSeconds()).padStart(2, '0'); // 초
  //   const ms = String(offsetDate.getUTCMilliseconds()).padStart(3, '0'); // 밀리초
  //   return `${yyyy}-${mm}-${dd}T${hh}:${min}:${ss}.${ms}`;
  // };
  

  const completeChallenge = async () => {
    if (selectedChallenge) {
      // POST 요청 데이터 생성
      const requestBody = {
        id: 0, // 서버에서 자동 생성될 경우 0으로 설정
        userId: `${TOKEN}`, // 사용자 ID는 토큰에서 가져오거나 백엔드에서 처리
        challengeId: selectedChallenge.id,
        challengeType: selectedChallenge.type || 'unknown', // 챌린지 타입 (필요 시 선택적으로 설정)
        goalDays: days,
        successDays: 0, // 처음에는 성공한 일수가 없으므로 0
        // startDate: toKoreaISOString(new Date()), // 현재 날짜를 시작일로 설정,
        // startDate: (() => {
        //   const start = new Date();
        //   start.setHours(0, 0, 0, 0); // 오늘 날짜의 0시 0분 0초로 설정
        //   return toKoreaISOString(start);
        // })(),
        // // endDate: new Date(new Date().setDate(new Date().getDate() + 7)).toISOString(), // goalDays 후 종료일 계산
        // endDate: (() => {
        //   const end = new Date();
        //   end.setDate(end.getDate() + 6); // 오늘 날짜로부터 6일 후
        //   end.setHours(23, 59, 59, 999); // 23시 59분 59초로 설정
        //   return toKoreaISOString(end);
        // })(),
        lastSuccessDate: null, // 초기에는 성공 날짜 없음
        lastCheckDate: null, // 초기에는 체크 날짜 없음
        status: false, // 활성 상태로 설정
      };

      // console.log(startDate);
      console.log(requestBody);

      try {
        const token = `${TOKEN}`; // 환경 변수에서 토큰 가져오기
        const response = await fetch(`${API_URL}challenges/${selectedChallenge.id}/participants`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`, // 토큰 포함
          },
          body: JSON.stringify(requestBody), // 요청 데이터
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const responseData = await response.json();
        console.log("Challenge participation successful:", responseData);

        // 참여 중 챌린지에 추가
        setOngoingChallenges((prevOngoingChallenges) => [
          ...prevOngoingChallenges,
          { ...selectedChallenge, name: selectedChallenge.title, status: "participating", days },
        ]);

        // 참여 가능 챌린지에서 제거
        setAvailableChallenges((prevAvailableChallenges) =>
          prevAvailableChallenges.filter(
            (challenge) => challenge.id !== selectedChallenge.id
          )
        );

        closeModal(); // 모달 닫기
      } catch (error) {
        console.error("Error completing challenge:", error);
        alert("챌린지 참여에 실패했습니다. 다시 시도해주세요.");
      }
    }
  };

  const manageChallenge = (id) => {
    const currentDate = new Date();
    const month = currentDate.getMonth() + 1; // 0-based -> 1-based
    const year = currentDate.getFullYear();
    const selected = ongoingChallenges.find((challenge) => challenge.id === id);
    if (selected) {
      navigate(`/challenge`, {
        state: {
          challengeId: selected.id,
          goalDays: selected.goalDays,
          month,
          year,
        },
      });
    } else {
      console.error('챌린지를 찾을 수 없습니다.');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="habit">
      <div className="top">
        <h1 className="title">습관</h1>
      </div>
      <div className="App">
        <div className="section">
          <h2>참여 중</h2>
          <ul>
            {ongoingChallenges.length > 0 ? (
              ongoingChallenges.map((challenge) => (
                <li key={challenge.id}>
                  <button
                    className="ing"
                    onClick={() => manageChallenge(challenge.id)}
                  >
                    {challenge.name}
                  </button>
                </li>
              ))
            ) : (
              <li>
                <p className="al">참여 중인 챌린지가 없습니다.</p>
              </li>
            )}
          </ul>
        </div>

        <div className="section">
          <h2>참여 가능</h2>
          <ul>
            {availableChallenges.length > 0 ? (
              availableChallenges.map((challenge) => (
                <li key={challenge.id}>
                  <button
                    className="available"
                    onClick={() => openModal(challenge)}
                  >
                    {challenge.title}
                  </button>
                </li>
              ))
            ) : (
              <li>
                <p className="al">참여 가능한 챌린지가 없습니다.</p>
              </li>
            )}
          </ul>
        </div>
      </div>

      {isModalOpen && selectedChallenge && (
        <div className="modal">
          <div className="modal-content">
            <h2>{selectedChallenge.title}</h2>
            <p>일주일에 며칠 도전하시겠어요?</p>
            <hr />
            <div className="modal-actions">
              <button onClick={decrementDays}>-</button>
              <span>{days}일</span>
              <button onClick={incrementDays}>+</button>
            </div>
            <button className="confirm-button" onClick={completeChallenge}>
              입력 완료
            </button>
          </div>
        </div>
      )}
      <NavigationBar />
    </div>
  );
};

export default HabitPage;
