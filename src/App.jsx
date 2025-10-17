import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './services/authStore';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import TeachMeThisPage from './pages/TeachMeThisPage';
import GradeEssayPage from './pages/GradeEssayPage';
import FindMistakePage from './pages/FindMistakePage';
import CreateFlashcardsPage from './pages/CreateFlashcardsPage';
import FindVideoPage from './pages/FindVideoPage';
import GenerateAudioPage from './pages/GenerateAudioPage';
import DeeplyResearchPage from './pages/DeeplyResearchPage';
import PredictedTestPage from './pages/PredictedTestPage';
import ProfilePage from './pages/ProfilePage';
import HistoryPage from './pages/HistoryPage';

/**
 * メインアプリケーションコンポーネント
 * ルーティングと認証状態管理を担当
 */
function App() {
  const { user, isLoading } = useAuthStore();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">読み込み中...</p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {user && <Header />}
        
        <main className="container mx-auto px-4 py-8">
          <Routes>
            {/* パブリックルート */}
            <Route path="/" element={user ? <Navigate to="/dashboard" /> : <HomePage />} />
            <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <LoginPage />} />
            <Route path="/register" element={user ? <Navigate to="/dashboard" /> : <RegisterPage />} />

            {/* プライベートルート（認証必須） */}
            <Route
              path="/dashboard"
              element={user ? <DashboardPage /> : <Navigate to="/login" />}
            />
            <Route
              path="/teach-me-this"
              element={user ? <TeachMeThisPage /> : <Navigate to="/login" />}
            />
            <Route
              path="/grade-essay"
              element={user ? <GradeEssayPage /> : <Navigate to="/login" />}
            />
            <Route
              path="/find-mistake"
              element={user ? <FindMistakePage /> : <Navigate to="/login" />}
            />
            <Route
              path="/create-flashcards"
              element={user ? <CreateFlashcardsPage /> : <Navigate to="/login" />}
            />
            <Route
              path="/find-video"
              element={user ? <FindVideoPage /> : <Navigate to="/login" />}
            />
            <Route
              path="/generate-audio"
              element={user ? <GenerateAudioPage /> : <Navigate to="/login" />}
            />
            <Route
              path="/deeply-research"
              element={user ? <DeeplyResearchPage /> : <Navigate to="/login" />}
            />
            <Route
              path="/predicted-test"
              element={user ? <PredictedTestPage /> : <Navigate to="/login" />}
            />
            <Route
              path="/profile"
              element={user ? <ProfilePage /> : <Navigate to="/login" />}
            />
            <Route
              path="/history"
              element={user ? <HistoryPage /> : <Navigate to="/login" />}
            />

            {/* 404 */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
