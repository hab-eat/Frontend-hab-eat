// import React, { useState } from 'react';
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Navigate,
// } from 'react-router-dom';
// import LoginPage from './pages/LoginPage';
// import UserInfoPage from './pages/UserInfoPage';
// import NutritionPage from './pages/NutritionPage';
// import NavigationBar from './components/NavigationBar';
// import MyPage from './pages/MyPage';
// import Settings from './pages/Settings';
// import Guide from './pages/Guide';
// import Notifications from './pages/Notifications';
// import PrivacyPolicy from './pages/PrivacyPolicy';
// import HabitPage from './pages/HabitPage';
// import ChallengePage from './pages/ChallengePage';
// import ChallengeCamera from './pages/ChallengeCamera';

// const App = () => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false); // 로그인 여부 상태
//   const [isInfoComplete, setIsInfoComplete] = useState(false); // 유저 정보 입력 여부 상태

//   const handleLoginSuccess = () => {
//     setIsAuthenticated(true); // 로그인 성공 시 상태 변경
//   };

//   const handleInfoComplete = () => {
//     setIsInfoComplete(true); // 유저 정보 입력 완료 시 상태 변경
//     console.log(isAuthenticated, isInfoComplete);
//   };

//   return (
//     <Router>
//       <div style={{ paddingBottom: '80px' }}>
//         <Routes>
//           {/* 초기 화면: LoginPage */}
//           <Route
//             path="/"
//             element={
//               isAuthenticated ? (
//                 isInfoComplete ? (
//                   <Navigate to="/nutrition" />
//                 ) : (
//                   <Navigate to="/userinfo" />
//                 )
//               ) : (
//                 <LoginPage onLoginSuccess={handleLoginSuccess} />
//               )
//             }
//           />
//           <Route
//             path="/userinfo"
//             element={<UserInfoPage onComplete={handleInfoComplete} />}
//           />
//           <Route path="/nutrition" element={<NutritionPage />} />
//           <Route path="/habit" element={<HabitPage />} />
//           <Route path="/mypage" element={<MyPage />} />
//           <Route path="/settings" element={<Settings />} />
//           <Route path="/guide" element={<Guide />} />
//           <Route path="/settings/edit-profile" element={<UserInfoPage />} />
//           <Route path="/settings/notifications" element={<Notifications />} />
//           <Route path="/settings/privacy-policy" element={<PrivacyPolicy />} />
//           <Route path="/challenge" element={<ChallengePage />} />
//           <Route path="/challenge/camera" element={<ChallengeCamera />} />
//         </Routes>
//         {isAuthenticated && <NavigationBar />}{' '}
//         {/* 로그인 후에만 네비게이션 바 표시 */}
//       </div>
//     </Router>
//   );
// };

// export default App;
import React from 'react';
import LoadingPage from './pages/LoadingPage';

const App = () => {
  return <LoadingPage />;
};

export default App;
