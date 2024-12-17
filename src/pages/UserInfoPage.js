import React, { useState, useEffect } from 'react';
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

  useEffect(() => {
    console.log('use effect');
    const code = new URL(window.location.href).searchParams.get('code');
    if (code) {
      // 1. 카카오 서버에 인가 코드로 액세스 토큰 요청
      Api.getKakaoAccessToken(code)
        .then((response) => {
          const { access_token } = response.data;
          console.log('kakao server response');
          console.log(response.data);
          localStorage.setItem('snsToken', access_token); // 토큰을 로컬 스토리지에 저장
          console.log('로그인 성공');
          navigate('/userinfo'); // UserInfoPage로 이동
        })
        .catch((error) => {
          console.error('카카오 토큰 요청 실패:', error);
          alert('카카오 로그인 실패. 다시 시도해주세요.');
        });
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    const { nickname, height, weight, sex, type, activityLevel } = formData;

    if (!nickname || !height || !weight || !sex || !type || !activityLevel) {
      alert('모든 정보를 입력해주세요.');
      return;
    }
    const snsToken = `${localStorage.getItem('snsToken')}`;
    console.log({ snsToken });

    // 2. 사용자 정보와 액세스 토큰을 백엔드로 전송
    console.log({
      snsToken,
      nickname,
      height: parseInt(height),
      weight: parseInt(weight),
      sex,
      type,
      activityLevel,
    });
<<<<<<< HEAD
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}users/kakao-login`, {
        snsToken,
        nickname,
        height: parseInt(height),
        weight: parseInt(weight),
        sex,
        type,
        activityLevel,
      })
      .then((res) => {
        console.log(res.data);
=======

    Api.kakaoSignOrUp({
      snsToken,
      nickname,
      height: parseInt(height),
      weight: parseInt(weight),
      sex,
      type,
      activityLevel,
    })
      .then((data) => {
        console.log('서버 응답:', data);

        // token 추출 및 저장
        const { token } = data;
        if (token) {
          localStorage.setItem('Back_Token', token); // token을 localStorage에 저장
          console.log('토큰 저장 성공:', token);
        } else {
          console.warn('응답에 토큰이 없습니다.');
        }

>>>>>>> 4e7fc5aa9ed55c93f24887d8a95f22db4987ec43
        alert('사용자 정보가 저장되었습니다!');
        navigate('/nutrition'); // NutritionPage로 이동
      })
      .catch((error) => {
        console.log('사용자 정보 저장 실패:', error);
        alert('사용자 정보 저장 실패. 다시 시도해주세요.');
      });
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
