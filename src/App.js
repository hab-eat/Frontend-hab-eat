// import React, { useState } from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import UserInfoPage from './pages/UserInfoPage';
// import NutritionPage from './pages/NutritionPage';
// import NavigationBar from './components/NavigationBar';
// import MyPage from './pages/MyPage';
// import Settings from './pages/Settings';
// import Guide from './pages/Guide';
// import Notifications from './pages/Notifications';
// import PrivacyPolicy from './pages/PrivacyPolicy';

// const App = () => {
//   const [isInfoComplete, setIsInfoComplete] = useState(false);

//   const handleInfoComplete = () => {
//     setIsInfoComplete(true);
//   };

//   return (
//     <Router>
//       <div style={{ paddingBottom: '80px' }}> {/* 네비게이션 바 높이만큼 여백 추가 */}
//         <Routes>
//           <Route
//             path="/"
//             element={
//               isInfoComplete ? (
//                 <Navigate to="nutrition" />
//               ) : (
//                 <UserInfoPage onComplete={handleInfoComplete} />
//               )
//             }
//           />
//           <Route path="/nutrition" element={<NutritionPage />} />
//           <Route path="/habit" element={<div>습관 페이지 준비중...</div>} />
//           <Route path="/mypage" element={<MyPage />} />
//           <Route path="/settings" element={<Settings />} />
//           <Route path="/guide" element={<Guide />} />
//           <Route path="/settings/edit-profile" element={<UserInfoPage />} />
//           <Route path="/settings/notifications" element={<Notifications />} />
//           <Route path="/settings/privacy-policy" element={<PrivacyPolicy />} />
//         </Routes>
//         <NavigationBar /> {/* 네비게이션 바 추가 */}
//       </div>
//     </Router>
//   );
// };

// export default App;
import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import UserInfoPage from './pages/UserInfoPage';
import NutritionPage from './pages/NutritionPage';
import NavigationBar from './components/NavigationBar';
import MyPage from './pages/MyPage';
import Settings from './pages/Settings';
import Guide from './pages/Guide';
import Notifications from './pages/Notifications';
import PrivacyPolicy from './pages/PrivacyPolicy';
import HabitPage from './pages/HabitPage';
// import JoinPage from './pages/JoinPage';
import ChallengePage from './pages/ChallengePage';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // 로그인 여부 상태
  const [isInfoComplete, setIsInfoComplete] = useState(false); // 유저 정보 입력 여부 상태

  const handleLoginSuccess = () => {
    setIsAuthenticated(true); // 로그인 성공 시 상태 변경
  };

  const handleInfoComplete = () => {
    setIsInfoComplete(true); // 유저 정보 입력 완료 시 상태 변경
    console.log(isAuthenticated, isInfoComplete);
  };

  return (
    <Router>
      <div style={{ paddingBottom: '80px' }}>
        <Routes>
          {/* 초기 화면: LoginPage */}
          <Route
            path="/"
            element={
              isAuthenticated ? (
                isInfoComplete ? (
                  <Navigate to="/nutrition" />
                ) : (
                  <Navigate to="/userinfo" />
                )
              ) : (
                <LoginPage onLoginSuccess={handleLoginSuccess} />
              )
            }
          />
          <Route
            path="/userinfo"
            element={<UserInfoPage onComplete={handleInfoComplete} />}
          />
          <Route path="/nutrition" element={<NutritionPage />} />
          <Route path="/habit" element={<HabitPage />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/guide" element={<Guide />} />
          <Route path="/settings/edit-profile" element={<UserInfoPage />} />
          <Route path="/settings/notifications" element={<Notifications />} />
          <Route path="/settings/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/challenge" element={<ChallengePage />} />
        </Routes>
        {isAuthenticated && <NavigationBar />}{' '}
        {/* 로그인 후에만 네비게이션 바 표시 */}
      </div>
    </Router>
  );
};

export default App;
