import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../services/authStore';
import { LogOut, User, Home, History } from 'lucide-react';

/**
 * ヘッダーコンポーネント
 * ナビゲーションとポイント残数表示
 */
function Header() {
  const { user, userData, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <header className="bg-white dark:bg-gray-800 shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* ロゴ */}
          <Link to="/dashboard" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-blue-600">Q-Deli</span>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              24時間の英語家庭教師
            </span>
          </Link>

          {/* ナビゲーション */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              to="/dashboard"
              className="flex items-center space-x-1 text-gray-700 dark:text-gray-300 hover:text-blue-600 transition"
            >
              <Home size={18} />
              <span>ホーム</span>
            </Link>
            <Link
              to="/history"
              className="flex items-center space-x-1 text-gray-700 dark:text-gray-300 hover:text-blue-600 transition"
            >
              <History size={18} />
              <span>履歴</span>
            </Link>
          </nav>

          {/* ユーザー情報＆ポイント */}
          <div className="flex items-center space-x-4">
            {/* ポイント表示 */}
            {userData && (
              <div className="flex items-center space-x-3 bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-lg">
                <div className="flex items-center space-x-1">
                  <span className="text-2xl">💎</span>
                  <span className="font-bold text-lg">{userData.points.diamonds}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <span className="text-2xl">🎫</span>
                  <span className="font-bold text-lg">{userData.points.tickets}</span>
                </div>
              </div>
            )}

            {/* ユーザーメニュー */}
            <div className="flex items-center space-x-2">
              <Link
                to="/profile"
                className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition"
              >
                <User size={20} />
                <span className="hidden sm:inline">{userData?.displayName}</span>
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-red-100 dark:hover:bg-red-900 text-red-600 transition"
                title="ログアウト"
              >
                <LogOut size={20} />
                <span className="hidden sm:inline">ログアウト</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
