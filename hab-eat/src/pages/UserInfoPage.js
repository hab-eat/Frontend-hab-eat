import React, { useState } from 'react';
import './UserInfoPage.css';

const UserInfoPage = ({ onComplete }) => {
  const [formData, setFormData] = useState({
    nickname: '',
    height: '',
    weight: '',
    gender: '',
    purpose: '',
    activity: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    const { nickname, height, weight, gender, purpose, activity } = formData;

    if (!nickname || !height || !weight || !gender || !purpose || !activity) {
      alert('정보를 더 입력해 주세요.');
    } else {
      alert('확인 완료!');
      onComplete(); // 입력 완료 후 부모(App.js)로 신호를 보냄
    }
  };

  return (
    <div className="user-info-container">
      <h1>사용자 정보 입력</h1>
      <h2>Hab-eat 사용을 위한 기본 정보를 입력해주세요</h2>

      <label>닉네임</label>
      <input
        type="text"
        name="nickname"
        value={formData.nickname}
        onChange={handleInputChange}
        placeholder="닉네임을 입력하세요"
      />

      <label>키 (cm)</label>
      <input
        type="number"
        name="height"
        value={formData.height}
        onChange={handleInputChange}
        placeholder="키를 입력하세요"
      />

      <label>몸무게 (kg)</label>
      <input
        type="number"
        name="weight"
        value={formData.weight}
        onChange={handleInputChange}
        placeholder="몸무게를 입력하세요"
      />

      <label>성별</label>
      <div className="radio-group">
        <label>
          <input
            type="radio"
            name="gender"
            value="남성"
            checked={formData.gender === '남성'}
            onChange={handleInputChange}
          />
          남성
        </label>
        <label>
          <input
            type="radio"
            name="gender"
            value="여성"
            checked={formData.gender === '여성'}
            onChange={handleInputChange}
          />
          여성
        </label>
      </div>

      <label>사용 목적</label>
      <select name="purpose" value={formData.purpose} onChange={handleInputChange}>
        <option value="">목적을 선택하세요</option>
        <option value="다이어트">다이어트</option>
        <option value="체중유지">체중유지</option>
        <option value="벌크업">벌크업</option>
      </select>

      <label>운동량</label>
      <select name="activity" value={formData.activity} onChange={handleInputChange}>
        <option value="">운동량을 선택하세요</option>
        <option value="아주 적음">아주 적음</option>
        <option value="조금 적음">조금 적음</option>
        <option value="보통">보통</option>
        <option value="조금 많음">조금 많음</option>
        <option value="아주 많음">아주 많음</option>
      </select>

      <button onClick={handleSubmit}>등록 완료</button>
    </div>
  );
};

export default UserInfoPage;
