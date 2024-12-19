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
import MyPage from './pages/MyPage';
import Settings from './pages/Settings';
import Guide from './pages/Guide';
import Notifications from './pages/Notifications';
import PrivacyPolicy from './pages/PrivacyPolicy';
import HabitPage from './pages/HabitPage';
import ChallengePage from './pages/ChallengePage';
import ChallengeCamera from './pages/ChallengeCamera';
import FoodAnalysisResultPage from './pages/FoodAnalysisResultPage';
import FoodAnalysisCheckPage from './pages/FoodAnalysisCheckPage';
import FoodAnalysisRetryPage from './pages/FoodAnalysisRetryPage';
import FoodSelectionPage from './pages/FoodSelectionPage';
import QuantityAdjustPage from './pages/QuantityAdjustPage';
import SuccessPage from './pages/SuccessPage';
import RetryPage from './pages/RetryPage';
import KakaoRedirectPage from './pages/KakaoRedirectPage';
import DirectInputPage from './pages/DirectInputPage';

const App = () => {
  const [isAuthenticated] = useState(!!localStorage.getItem('Back_Token'));

  return (
    <Router>
      <div style={{ paddingBottom: '80px' }}>
        <Routes>
          <Route
            path="/"
            element={
              isAuthenticated ? <Navigate to="/nutrition" /> : <LoginPage />
            }
          />
          <Route path="/kakao-redirect" element={<KakaoRedirectPage />} />
          <Route path="/userinfo" element={<UserInfoPage />} />
          <Route path="/nutrition" element={<NutritionPage />} />
          <Route path="/habit" element={<HabitPage />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/guide" element={<Guide />} />
          <Route path="/settings/edit-profile" element={<UserInfoPage />} />
          <Route path="/settings/notifications" element={<Notifications />} />
          <Route path="/settings/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/challenge" element={<ChallengePage />} />
          <Route path="/challenge/camera" element={<ChallengeCamera />} />
          <Route
            path="/analysis/food-image/result"
            element={<FoodAnalysisResultPage />}
          />
          <Route
            path="/analysis/food-image/check"
            element={<FoodAnalysisCheckPage />}
          />
          <Route
            path="/analysis/food-image/retry"
            element={<FoodAnalysisRetryPage />}
          />
          <Route path="/food/direct-input" element={<DirectInputPage />} />
          <Route path="/food/autocomplete" element={<FoodSelectionPage />} />
          <Route path="/food/input-form" element={<QuantityAdjustPage />} />
          <Route path="/challenge/camera" element={<ChallengeCamera />} />

          <Route path="/success" element={<SuccessPage />} />
          <Route path="/retry" element={<RetryPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
