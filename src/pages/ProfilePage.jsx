import { useAuthStore } from '../services/authStore';

function ProfilePage() {
  const { userData } = useAuthStore();

  const gradeLevelMap = {
    'JH1st': '中学1年生',
    'JH2nd': '中学2年生',
    'JH3rd': '中学3年生',
    'SH1st': '高校1年生',
    'SH2nd': '高校2年生',
    'SH3rd': '高校3年生'
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          プロフィール
        </h1>
      </div>

      <div className="card">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              ニックネーム
            </label>
            <p className="text-lg">{userData?.displayName}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              メールアドレス
            </label>
            <p className="text-lg">{userData?.email}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              学年
            </label>
            <p className="text-lg">{gradeLevelMap[userData?.gradeLevel]}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-4 pt-4">
            <div className="bg-blue-50 dark:bg-blue-900 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">チケット残数</span>
                <div className="flex items-center space-x-1">
                  <span className="text-2xl">🎫</span>
                  <span className="text-2xl font-bold">{userData?.points.tickets}</span>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-900 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">ダイヤ残数</span>
                <div className="flex items-center space-x-1">
                  <span className="text-2xl">💎</span>
                  <span className="text-2xl font-bold">{userData?.points.diamonds}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
