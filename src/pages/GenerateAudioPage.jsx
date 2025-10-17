import { useState } from 'react';
import { useAuthStore } from '../services/authStore';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

function GenerateAudioPage() {
  const [text, setText] = useState('');
  const [isLoading] = useState(false);
  const [error] = useState('');
  const { userData } = useAuthStore();

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          🔊 Generate audio
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          テキストから音声解説を生成します。
        </p>
      </div>

      <div className="card">
        <ErrorMessage message={error} />
        
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="input-field min-h-[150px]"
          placeholder="音声化したいテキストを入力してください..."
          disabled={isLoading}
        />
        
        <button
          className="btn-primary w-full mt-4"
          disabled={isLoading || userData.points.tickets <= 0}
        >
          {isLoading ? '生成中...' : '音声を生成 (🎫 1)'}
        </button>
      </div>
    </div>
  );
}

export default GenerateAudioPage;
