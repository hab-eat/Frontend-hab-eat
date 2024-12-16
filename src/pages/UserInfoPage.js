// import React, { useState } from "react";
// import "./UserInfoPage.css";

// const UserInfoPage = ({ onComplete }) => {
//   const [formData, setFormData] = useState({
//     nickname: "",
//     height: "",
//     weight: "",
//     sex: "",
//     type: "",
//     activityLevel: "",
//   });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = () => {
//     const { nickname, height, weight, sex, type, activityLevel } = formData;

//     if (!nickname || !height || !weight || !sex || !type || !activityLevel) {
//       alert("정보를 더 입력해 주세요.");
//       console.log("입력 미완료: 일부 필드가 비어 있습니다.");
//     } else {
//       alert("확인 완료!");
//       console.log("입력 완료: 모든 필드가 입력되었습니다.");
//       onComplete(); // App.js의 handleInfoComplete 호출
//     }
//   };

//   return (
//     <div className="user-info-container">
//       <h1>사용자 정보 입력</h1>
//       <h2>Hab-eat 사용을 위한 기본 정보를 입력해주세요</h2>

//       <label>닉네임</label>
//       <input
//         type="text"
//         name="nickname"
//         value={formData.nickname}
//         onChange={handleInputChange}
//         placeholder="닉네임을 입력하세요"
//       />

//       <label>키 (cm)</label>
//       <input
//         type="number"
//         name="height"
//         value={formData.height}
//         onChange={handleInputChange}
//         placeholder="키를 입력하세요"
//       />

//       <label>몸무게 (kg)</label>
//       <input
//         type="number"
//         name="weight"
//         value={formData.weight}
//         onChange={handleInputChange}
//         placeholder="몸무게를 입력하세요"
//       />

//       <label>성별</label>
//       <div className="radio-group">
//         <label>
//           <input
//             type="radio"
//             name="sex"
//             value="male"
//             checked={formData.sex === "male"}
//             onChange={handleInputChange}
//           />
//           남성
//         </label>
//         <label>
//           <input
//             type="radio"
//             name="sex"
//             value="female"
//             checked={formData.sex === "female"}
//             onChange={handleInputChange}
//           />
//           여성
//         </label>
//       </div>

//       <label>사용 목적</label>
//       <select name="type" value={formData.type} onChange={handleInputChange}>
//         <option value="">목적을 선택하세요</option>
//         <option value="diet">다이어트</option>
//         <option value="maintain">체중유지</option>
//         <option value="bulk">벌크업</option>
//       </select>

//       <label>운동량</label>
//       <select name="activityLevel" value={formData.activityLevel} onChange={handleInputChange}>
//         <option value="">운동량을 선택하세요</option>
//         <option value="sedentary">아주 적음</option>
//         <option value=" lightlyActive">조금 적음</option>
//         <option value="moderatelyActive">보통</option>
//         <option value="veryActive">조금 많음</option>
//         <option value="extraActive">아주 많음</option>
//       </select>

//       <button onClick={handleSubmit}>등록 완료</button>
//     </div>
//   );
// };

// export default UserInfoPage;
import React, { useState, useEffect } from 'react';
import './UserInfoPage.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserInfoPage = () => {
  const redirectUrl = process.env.REACT_APP_KAKAO_REDIRECT_URL; // 카카오 개발자 콘솔에 등록된 Redirect URI
  const Rest_api_key = process.env.REACT_APP_KAKAO_REST_API_KEY; // 카카오 REST API 키
  const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${Rest_api_key}&redirect_uri=${redirectUrl}&response_type=code`;
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
      axios
        .post('https://kauth.kakao.com/oauth/token', null, {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          params: {
            grant_type: 'authorization_code',
            client_id: Rest_api_key,
            redirect_uri: redirectUrl,
            code,
          },
        })
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
        alert('사용자 정보가 저장되었습니다!');
        navigate('/nutrition'); // NutritionPage로 이동
      })
      .catch((error) => {
        console.error('사용자 정보 저장 실패:', error);
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
