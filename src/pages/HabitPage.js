// import React, { useState } from 'react';
import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
import { useNavigate, useLocation } from 'react-router-dom';
import "./HabitPage.css";

export const HabitPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [challenges, setChallenges] = useState([
    { id: 1, title: '매일 운동', status: 'available' },
    { id: 2, title: '건강식 챌린지', status: 'available' },
    { id: 3, title: '미라클 모닝', status: 'available' },
  ]);

  // 월요일인지 구분
//   const isMonday = new Date().getDay() === 1;
  const isMonday = true;

  // 월요일인지 판단 후 신청 페이지로 넘어가기
  const joinChallenge = (id) => {
    if (isMonday) {
      // 월요일이면 신청 페이지로 넘어감
      navigate(`/join?id=${id}`, { state: { id } });
    } else {
      // 월요일이 아니면 경고만 표시
      alert("월요일에 참여해주세요!");
    }
  };

  // 참여 완료 후 돌아올 때 해당 챌린지 상태 업데이트
  useEffect(() => {
    // console.log(location.state);
    // console.log(location.state.participatedChallengeId);
    if (location.state && location.state.participatedChallengeId) {
      const participatedId = location.state.participatedChallengeId;
      setChallenges(prevChallenges =>
        prevChallenges.map(challenge =>
          challenge.id === participatedId 
            ? { ...challenge, status: 'participating' }
            : challenge
        )
      );
      // 상태를 반영한 뒤, 주소 상태를 초기화하여 새로고침 시 재적용 안 되도록 함
    //   navigate('/habit');
      navigate('/habit', { replace: true });
    }
  }, [location.state, navigate]);

  const manageChallenge = (id) => {
    console.log(id);
    navigate(`/challenge?id=${id}`, { state: { id } });
  };

  // 참여 중, 참여 가능 챌린지 구분
  const participatingChallenges = challenges.filter(challenge => challenge.status === 'participating');
  const availableChallenges = challenges.filter(challenge => challenge.status === 'available');

  return (
    <div className="App">
      <h1 className='title'>습관 챌린지</h1>
      
      <div className="section">
        <h2>참여 중</h2>
        <ul>
          {participatingChallenges.length > 0 ? (
            participatingChallenges.map(challenge => (
              <li key={challenge.id}>
                <button onClick={() => manageChallenge(challenge.id)}>{challenge.title} </button>
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
                <button onClick={() => joinChallenge(challenge.id)}>
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
  );
};

export default HabitPage;
