import { useAuthStore } from '../services/authStore';
import FeatureCard from '../components/FeatureCard';

/**
 * ダッシュボードページ
 * 全機能へのアクセスポイント
 */
function DashboardPage() {
  const { userData } = useAuthStore();

  const features = [
    {
      title: 'Teach me this',
      description: '質問に対して分かりやすく段階的に解説します',
      icon: '📚',
      pointType: 'ticket',
      pointCost: 1,
      to: '/teach-me-this',
      bgColor: 'bg-blue-500'
    },
    {
      title: 'Grade my essay',
      description: '英作文を採点して詳細なフィードバックを提供',
      icon: '✍️',
      pointType: 'ticket',
      pointCost: 1,
      to: '/grade-essay',
      bgColor: 'bg-green-500'
    },
    {
      title: 'Find my mistake',
      description: '誤りを見つけて正しい答えと理由を説明',
      icon: '🔍',
      pointType: 'ticket',
      pointCost: 1,
      to: '/find-mistake',
      bgColor: 'bg-red-500'
    },
    {
      title: 'Create flashcards',
      description: 'トピックから暗記カードを自動生成',
      icon: '🃏',
      pointType: 'ticket',
      pointCost: 1,
      to: '/create-flashcards',
      bgColor: 'bg-purple-500'
    },
    {
      title: 'Find a video',
      description: '関連するYouTube動画を検索して表示',
      icon: '🎥',
      pointType: 'ticket',
      pointCost: 1,
      to: '/find-video',
      bgColor: 'bg-pink-500'
    },
    {
      title: 'Generate audio',
      description: 'テキストから音声解説を生成',
      icon: '🔊',
      pointType: 'ticket',
      pointCost: 1,
      to: '/generate-audio',
      bgColor: 'bg-indigo-500'
    },
    {
      title: 'Deeply Research',
      description: 'トピックを深掘り調査してレポート作成',
      icon: '🔬',
      pointType: 'diamond',
      pointCost: 1,
      to: '/deeply-research',
      bgColor: 'bg-yellow-500'
    },
    {
      title: 'Predicted Test',
      description: '試験問題を生成して弱点を分析',
      icon: '📝',
      pointType: 'diamond',
      pointCost: 1,
      to: '/predicted-test',
      bgColor: 'bg-orange-500'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto">
      {/* ウェルカムセクション */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          こんにちは、{userData?.displayName}さん！
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          今日も一緒に英語学習を頑張りましょう 📖
        </p>
      </div>

      {/* ポイント残数表示 */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="card bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-800">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-1">
                チケット残数
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                毎日00:00に15枚配布
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-4xl">🎫</span>
              <span className="text-4xl font-bold text-blue-600 dark:text-blue-400">
                {userData?.points.tickets}
              </span>
            </div>
          </div>
        </div>

        <div className="card bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900 dark:to-yellow-800">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-1">
                ダイヤ残数
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                毎月1日に5個配布（ロールオーバー可）
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-4xl">💎</span>
              <span className="text-4xl font-bold text-yellow-600 dark:text-yellow-400">
                {userData?.points.diamonds}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 機能カード一覧 */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          利用できる機能
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </div>

      {/* ヒント */}
      <div className="mt-8 card bg-blue-50 dark:bg-blue-900">
        <h3 className="font-bold text-lg mb-2">💡 使い方のヒント</h3>
        <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
          <li>• チケット🎫は基本機能で使用できます（毎日15枚配布）</li>
          <li>• ダイヤ💎はプレミアム機能で使用できます（毎月5個配布、繰越可能）</li>
          <li>• 1つのセッション内では追加のポイント消費はありません</li>
          <li>• 質問の際は具体的に書くと、より良い回答が得られます</li>
        </ul>
      </div>
    </div>
  );
}

export default DashboardPage;
