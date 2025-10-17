import { useState, useEffect } from 'react';
import { useAuthStore } from '../services/authStore';

function HistoryPage() {
  const [history] = useState([]);
  const { user } = useAuthStore();

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          利用履歴
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          過去の学習履歴を確認できます。
        </p>
      </div>

      <div className="card">
        {history.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">
              まだ履歴がありません。機能を使ってみましょう！
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {history.map((item, index) => (
              <div key={index} className="border-b pb-4 last:border-b-0">
                <p className="font-semibold">{item.feature}</p>
                <p className="text-sm text-gray-600">{item.timestamp}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default HistoryPage;
