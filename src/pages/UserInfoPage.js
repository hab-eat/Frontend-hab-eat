import React, { useState } from 'react';
import './UserInfoPage.css';
import { useNavigate } from 'react-router-dom';
import Api from '../api';

const UserInfoPage = () => {
  const [formData, setFormData] = useState({
    nickname: '',
    height: '',
    weight: '',
    sex: '',
    type: '',
    activityLevel: '',
  });

  const navigate = useNavigate();

  const putUser = async () => {
    const { nickname, height, weight, sex, type, activityLevel } = formData;

    if (!nickname || !height || !weight || !sex || !type || !activityLevel) {
      alert('모든 정보를 입력해주세요.');
      return;
    }
    await Api.PutUser({
      nickname,
      height: parseInt(height),
      weight: parseInt(weight),
      sex,
      type,
      activityLevel,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      await putUser();
    } catch (error) {
      console.error(error);
      alert('유저 정보 저장에 실패했습니다.');
    }

    navigate('/nutrition');
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
            name="sex"
            value="male"
            checked={formData.sex === 'male'}
            onChange={handleInputChange}
          />
          남성
        </label>
        <label>
          <input
            type="radio"
            name="sex"
            value="female"
            checked={formData.sex === 'female'}
            onChange={handleInputChange}
          />
          여성
        </label>
      </div>

      <label>사용 목적</label>
      <select name="type" value={formData.type} onChange={handleInputChange}>
        <option value="">목적을 선택하세요</option>
        <option value="diet">다이어트</option>
        <option value="maintain">체중유지</option>
        <option value="bulk">벌크업</option>
      </select>

      <label>운동량</label>
      <select
        name="activityLevel"
        value={formData.activityLevel}
        onChange={handleInputChange}
      >
        <option value="">운동량을 선택하세요</option>
        <option value="sedentary">아주 적음</option>
        <option value="lightlyActive">조금 적음</option>
        <option value="moderatelyActive">보통</option>
        <option value="veryActive">조금 많음</option>
        <option value="extraActive">아주 많음</option>
      </select>

      <button onClick={handleSubmit}>등록 완료</button>
    </div>
  );
};

export default UserInfoPage;
