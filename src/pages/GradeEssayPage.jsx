import { useState } from 'react';
import { useAuthStore } from '../services/authStore';
import { gradeEssay } from '../services/apiService';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import SuccessMessage from '../components/SuccessMessage';

function GradeEssayPage() {
  const [essayText, setEssayText] = useState('');
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const { user, userData, updatePoints } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setResult(null);

    if (!essayText.trim()) {
      setError('英作文を入力してください');
      return;
    }

    if (userData.points.tickets <= 0) {
      setError('チケットが不足しています。');
      return;
    }

    setIsLoading(true);

    try {
      const response = await gradeEssay(essayText, user.uid);
      
      if (response.success) {
        setResult(response.data);
        setSuccess('採点が完了しました！');
        
        if (response.pointsRemaining) {
          updatePoints(response.pointsRemaining);
        }
      }
    } catch (err) {
      console.error('Grade essay error:', err);
      setError('エラーが発生しました。もう一度お試しください。');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          ✍️ Grade my essay
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          英作文を採点して詳細なフィードバックを提供します。
        </p>
      </div>

      <div className="card mb-6">
        <ErrorMessage message={error} onDismiss={() => setError('')} />
        <SuccessMessage message={success} onDismiss={() => setSuccess('')} />

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="essay" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              英作文
            </label>
            <textarea
              id="essay"
              value={essayText}
              onChange={(e) => setEssayText(e.target.value)}
              className="input-field min-h-[200px]"
              placeholder="英作文を入力してください..."
              disabled={isLoading}
              required
            />
          </div>

          <button
            type="submit"
            className="btn-primary w-full"
            disabled={isLoading || userData.points.tickets <= 0}
          >
            {isLoading ? '採点中...' : '採点する (🎫 1)'}
          </button>
        </form>
      </div>

      {isLoading && <LoadingSpinner message="採点中..." />}

      {result && (
        <div className="space-y-6">
          <div className="card bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900 dark:to-green-800">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-4">スコア</h3>
              <div className="text-6xl font-bold text-green-600 dark:text-green-400">
                {result.score}/100
              </div>
              <div className="mt-2 text-lg font-semibold">
                グレード: {result.grade}
              </div>
            </div>
          </div>

          <div className="card">
            <h3 className="font-bold text-lg mb-4">📝 フィードバック</h3>
            <div className="whitespace-pre-wrap text-gray-800 dark:text-gray-200">
              {result.feedback}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default GradeEssayPage;
