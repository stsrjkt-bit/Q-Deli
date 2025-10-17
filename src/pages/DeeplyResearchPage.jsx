import { useState } from 'react';
import { useAuthStore } from '../services/authStore';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

function DeeplyResearchPage() {
  const [topic, setTopic] = useState('');
  const [isLoading] = useState(false);
  const [error] = useState('');
  const { userData } = useAuthStore();

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center space-x-2 mb-2">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            🔬 Deeply Research
          </h1>
          <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white px-3 py-1 text-xs font-bold rounded-lg">
            PREMIUM
          </span>
        </div>
        <p className="text-gray-600 dark:text-gray-400">
          トピックを深掘り調査してレポートを作成します。
        </p>
      </div>

      <div className="card border-2 border-yellow-400">
        <ErrorMessage message={error} />
        
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="input-field"
          placeholder="調査トピックを入力してください"
          disabled={isLoading}
        />
        
        <button
          className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white font-semibold py-2 px-4 rounded-lg w-full mt-4"
          disabled={isLoading || userData.points.diamonds <= 0}
        >
          {isLoading ? '調査中...' : '深掘り調査を開始 (💎 1)'}
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

export default DeeplyResearchPage;
