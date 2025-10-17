import { useState } from 'react';
import { useAuthStore } from '../services/authStore';
import { teachMeThis } from '../services/apiService';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import SuccessMessage from '../components/SuccessMessage';

/**
 * Teach me this 機能ページ
 */
function TeachMeThisPage() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const { user, userData, updatePoints } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setAnswer('');

    if (!question.trim()) {
      setError('質問を入力してください');
      return;
    }

    if (userData.points.tickets <= 0) {
      setError('チケットが不足しています。明日の00:00に15枚配布されます。');
      return;
    }

    setIsLoading(true);

    try {
      const response = await teachMeThis(question, user.uid);
      
      if (response.success) {
        setAnswer(response.data.answer);
        setSuccess('解説を生成しました！');
        
        // ポイント更新
        if (response.pointsRemaining) {
          updatePoints(response.pointsRemaining);
        }
      }
    } catch (err) {
      console.error('Teach me this error:', err);
      setError('エラーが発生しました。もう一度お試しください。');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          📚 Teach me this
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          質問を入力してください。段階的に分かりやすく解説します。
        </p>
      </div>

      <div className="card mb-6">
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              必要ポイント
            </span>
            <div className="flex items-center space-x-1">
              <span className="text-xl">🎫</span>
              <span className="font-bold">1</span>
            </div>
          </div>
        </div>

        <ErrorMessage message={error} onDismiss={() => setError('')} />
        <SuccessMessage message={success} onDismiss={() => setSuccess('')} />

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="question" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              質問内容
            </label>
            <textarea
              id="question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="input-field min-h-[120px]"
              placeholder="例：不定詞の用法について教えてください"
              disabled={isLoading}
              required
            />
            <p className="mt-1 text-sm text-gray-500">
              具体的に書くと、より良い回答が得られます
            </p>
          </div>

          <button
            type="submit"
            className="btn-primary w-full"
            disabled={isLoading || userData.points.tickets <= 0}
          >
            {isLoading ? '処理中...' : '解説を受け取る'}
          </button>
        </form>
      </div>

      {isLoading && (
        <LoadingSpinner message="AI が解説を生成しています..." />
      )}

      {answer && (
        <div className="card bg-blue-50 dark:bg-blue-900">
          <h3 className="font-bold text-lg mb-4 text-blue-900 dark:text-blue-100">
            💡 解説
          </h3>
          <div className="prose dark:prose-invert max-w-none">
            <div className="whitespace-pre-wrap text-gray-800 dark:text-gray-200">
              {answer}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TeachMeThisPage;
