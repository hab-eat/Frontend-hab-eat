// import React from 'react';
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import "./JoinPage.css";
import back from "../img/back.svg";

const JoinPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  
  // HabitPage에서 navigate 시 state로 전달한 id 받아오기
  const { id } = location.state || {};
//   console.log(id);

    // 숫자 입력을 처리하는 함수
    const handleInputChange = (event) => {
        const value = event.target.value;

        // 1~7 사이의 숫자만 허용
        if (value === '' || (value >= 1 && value <= 7)) {
        setGoalDays(value);
        }
    };

    const [goalDays, setGoalDays] = useState('');
  const handleComplete = () => {
    if (!goalDays) {
        alert("목표 일수를 1에서 7 사이로 입력해주세요.");
        return;
    }
    // 참여 완료 시 HabitPage로 돌아가며 participatedChallengeId를 전달
    navigate('/habit', { state: { participatedChallengeId: id } });
    // console.log(id);
    // console.log(location.state.participatedChallengeId);
  };

  return (
    <div className='App'>
        <div className='div'>
            <div className="settings-header">
            <img
                className="settings-back-icon"
                alt="Back"
                src={back}
                onClick={() => navigate(-1)} // 뒤로가기
            />
            {/* <span className="settings-title">챌린지 참여 신청</span> */}
            </div>
            <h1>챌린지 참여 신청</h1>
        </div>
      <div className='section'>
        <p className='goal'>일주일 동안 며칠을 목표로 하시나요?</p>
        <input 
        type="number" 
        min="1" 
        max="7" 
        value={goalDays} 
        onChange={handleInputChange} 
        placeholder="1~7일" 
      />
      </div>
      
      {/* <p>챌린지 ID: {id}</p> */}
      <button onClick={() => handleComplete(id)}>완료</button>
    </div>
  );
};

export default JoinPage;
