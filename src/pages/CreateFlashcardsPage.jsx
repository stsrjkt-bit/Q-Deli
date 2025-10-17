import { useState } from 'react';
import { useAuthStore } from '../services/authStore';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

function CreateFlashcardsPage() {
  const [topic, setTopic] = useState('');
  const [isLoading] = useState(false);
  const [error] = useState('');
  const { userData } = useAuthStore();

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          🃏 Create flashcards
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          トピックから暗記カードを自動生成します。
        </p>
      </div>

      <div className="card">
        <ErrorMessage message={error} />
        
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="input-field"
          placeholder="トピックを入力してください（例：不規則動詞）"
          disabled={isLoading}
        />
        
        <button
          className="btn-primary w-full mt-4"
          disabled={isLoading || userData.points.tickets <= 0}
        >
          {isLoading ? '生成中...' : '暗記カードを作成 (🎫 1)'}
        </button>
      </div>
    </div>
  );
}

export default CreateFlashcardsPage;
