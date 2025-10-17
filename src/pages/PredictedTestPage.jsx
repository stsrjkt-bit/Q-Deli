import { useState } from 'react';
import { useAuthStore } from '../services/authStore';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

function PredictedTestPage() {
  const [isLoading] = useState(false);
  const [error] = useState('');
  const { userData } = useAuthStore();

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center space-x-2 mb-2">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            📝 Predicted Test
          </h1>
          <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white px-3 py-1 text-xs font-bold rounded-lg">
            PREMIUM
          </span>
        </div>
        <p className="text-gray-600 dark:text-gray-400">
          試験問題を生成して弱点を分析します。
        </p>
      </div>

      <div className="card border-2 border-yellow-400">
        <ErrorMessage message={error} />
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            学年レベル
          </label>
          <p className="text-lg font-semibold">{userData.gradeLevel}</p>
        </div>
        
        <button
          className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white font-semibold py-2 px-4 rounded-lg w-full"
          disabled={isLoading || userData.points.diamonds <= 0}
        >
          {isLoading ? '生成中...' : '試験問題を生成 (💎 1)'}
        </button>

        {userData.points.diamonds <= 0 && (
          <p className="mt-2 text-sm text-red-600">
            ダイヤが不足しています。来月1日に5個配布されます。
          </p>
        )}
      </div>
    </div>
  );
}

export default PredictedTestPage;
