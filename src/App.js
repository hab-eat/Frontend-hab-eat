// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

// import React from 'react';
// import LoginPage from './pages/UserInfoPage';

// const App = () => {
//   return <LoginPage />;
// };

// export default App;

// import React from 'react';
// import UserInfoPage from './pages/NutritionPage';

// // const App = () => {
// //   return <UserInfoPage />;
// // };

// // export default App;
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import UserInfoPage from './pages/UserInfoPage';
import NutritionPage from './pages/NutritionPage';
import NavigationBar from './components/NavigationBar';
import MyPage from './pages/MyPage';
import Settings from './pages/Settings';
import Guide from './pages/Guide';
import Notifications from './pages/Notifications';
import PrivacyPolicy from './pages/PrivacyPolicy';

const App = () => {
  const [isInfoComplete, setIsInfoComplete] = useState(false);

  const handleInfoComplete = () => {
    setIsInfoComplete(true);
  };

  return (
    <Router>
      <div style={{ paddingBottom: '80px' }}> {/* 네비게이션 바 높이만큼 여백 추가 */}
        <Routes>
          <Route
            path="/"
            element={
              isInfoComplete ? (
                <Navigate to="nutrition" />
              ) : (
                <UserInfoPage onComplete={handleInfoComplete} />
              )
            }
          />
          <Route path="/nutrition" element={<NutritionPage />} />
          <Route path="/habit" element={<div>습관 페이지 준비중...</div>} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/guide" element={<Guide />} />
          <Route path="/settings/edit-profile" element={<UserInfoPage />} />
          <Route path="/settings/notifications" element={<Notifications />} />
          <Route path="/settings/privacy-policy" element={<PrivacyPolicy />} />
        </Routes>
        <NavigationBar /> {/* 네비게이션 바 추가 */}
      </div>
    </Router>
  );
};

export default App;
