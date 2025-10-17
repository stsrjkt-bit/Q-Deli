import { useState } from 'react';
import { useAuthStore } from '../services/authStore';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

function FindVideoPage() {
  const [keyword, setKeyword] = useState('');
  const [isLoading] = useState(false);
  const [error] = useState('');
  const { userData } = useAuthStore();

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          🎥 Find a video
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          関連するYouTube動画を検索します。
        </p>
      </div>

      <div className="card">
        <ErrorMessage message={error} />
        
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="input-field"
          placeholder="検索キーワードを入力してください"
          disabled={isLoading}
        />
        
        <button
          className="btn-primary w-full mt-4"
          disabled={isLoading || userData.points.tickets <= 0}
        >
          {isLoading ? '検索中...' : '動画を検索 (🎫 1)'}
        </button>
      </div>
    </div>
  );
}

export default FindVideoPage;
