import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import "./HabitPage.css";

export const HabitPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [challenges, setChallenges] = useState([
    { id: 1, title: '양치 챌린지', status: 'available' },
    { id: 2, title: '운동 챌린지', status: 'available' },
    { id: 3, title: '식단 챌린지', status: 'available' },
  ]);

  const [selectedChallenge, setSelectedChallenge] = useState(null); // 선택된 챌린지
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 열림/닫힘 상태
  const [days, setDays] = useState(5); // 기본 일 수는 5로 설정

  // 모달 열기
  const openModal = (challenge) => {
    setSelectedChallenge(challenge); // 선택된 챌린지 설정
    setIsModalOpen(true); // 모달 열기
    setDays(5); // 모달 열릴 때 기본값으로 초기화
  };

  // 모달 닫기
  const closeModal = () => {
    setSelectedChallenge(null);
    setIsModalOpen(false);
  };

  // 일 수 증가
  const incrementDays = () => {
    if (days < 7) setDays((prev) => prev + 1); // 최대 7일까지 증가
  };

  // 일 수 감소
  const decrementDays = () => {
    if (days > 1) setDays((prev) => prev - 1); // 최소 1일까지 감소
  };

  // 입력 완료 버튼 핸들러
  const completeChallenge = () => {
    if (selectedChallenge) {
      setChallenges(prevChallenges =>
        prevChallenges.map(challenge =>
          challenge.id === selectedChallenge.id
            ? { ...challenge, status: 'participating', days } // 상태를 'participating'으로 변경
            : challenge
        )
      );
      closeModal(); // 모달 닫기
    }
  };

  const manageChallenge = (id) => {
    console.log(id);
    navigate(`/challenge?id=${id}`, { state: { id } });
  };



  const participatingChallenges = challenges.filter(challenge => challenge.status === 'participating');
  const availableChallenges = challenges.filter(challenge => challenge.status === 'available');

  return (
    <div className='habit'>
      <div className='top'>
        <h1 className='title'>습관</h1>
      </div>
      <div className="App">
        <div className="section">
          <h2>참여 중</h2>
          <ul>
            {participatingChallenges.length > 0 ? (
              participatingChallenges.map(challenge => (
                <li key={challenge.id}>
                  <button className="ing" onClick={() => manageChallenge(challenge.id)}>{challenge.title}</button>
                </li>
              ))
            ) : (
              <li>
                <p className='al'>참여 중인 챌린지가 없습니다.</p>
              </li>
            )}
          </ul>
        </div>

        <div className="section">
          <h2>참여 가능</h2>
          <ul>
            {availableChallenges.length > 0 ? (
              availableChallenges.map(challenge => (
                <li key={challenge.id}>
                  <button
                    className="available"
                    onClick={() => openModal(challenge)} // 모달 열기
                  >
                    {challenge.title}
                  </button>
                </li>
              ))
            ) : (
              <li>
                <p className='al'>참여 가능한 챌린지가 없습니다.</p>
              </li>
            )}
          </ul>
        </div>
      </div>

      {/* 모달 컴포넌트 */}
      {isModalOpen && selectedChallenge && (
        <div className="modal">
          <div className="modal-content">
            <h2>{selectedChallenge.title}</h2>
            <p>일주일에 며칠 도전하시겠어요?</p>
            <hr></hr>
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
    </div>
  );
};

export default HabitPage;
