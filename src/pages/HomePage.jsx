import { Link } from 'react-router-dom';
import { BookOpen, Sparkles, Clock, Award } from 'lucide-react';

/**
 * ホームページ（ランディングページ）
 */
function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      {/* ヒーローセクション */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Q-Deli
          </h1>
          <p className="text-2xl md:text-3xl text-blue-600 dark:text-blue-400 mb-8">
            24時間の英語家庭教師
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
            中学生・高校生のための AI 英語学習サポートアプリ。
            いつでも、どこでも、質問できる。
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/register"
              className="btn-primary text-lg px-8 py-3"
            >
              無料で始める
            </Link>
            <Link
              to="/login"
              className="btn-secondary text-lg px-8 py-3"
            >
              ログイン
            </Link>
          </div>
        </div>

        {/* 特徴セクション */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <div className="card text-center">
            <BookOpen className="mx-auto mb-4 text-blue-600" size={48} />
            <h3 className="text-xl font-bold mb-2">8つの機能</h3>
            <p className="text-gray-600 dark:text-gray-400">
              質問解説から試験対策まで、学習を総合サポート
            </p>
          </div>

          <div className="card text-center">
            <Clock className="mx-auto mb-4 text-green-600" size={48} />
            <h3 className="text-xl font-bold mb-2">24時間対応</h3>
            <p className="text-gray-600 dark:text-gray-400">
              深夜の質問も、早朝の復習も、いつでもOK
            </p>
          </div>

          <div className="card text-center">
            <Sparkles className="mx-auto mb-4 text-purple-600" size={48} />
            <h3 className="text-xl font-bold mb-2">AI搭載</h3>
            <p className="text-gray-600 dark:text-gray-400">
              最新のClaude AIが丁寧に解説
            </p>
          </div>

          <div className="card text-center">
            <Award className="mx-auto mb-4 text-yellow-600" size={48} />
            <h3 className="text-xl font-bold mb-2">学年別対応</h3>
            <p className="text-gray-600 dark:text-gray-400">
              中1から高3まで、レベルに合わせた説明
            </p>
          </div>
        </div>

        {/* 機能紹介 */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">主な機能</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-start space-x-4">
              <span className="text-3xl">📚</span>
              <div>
                <h4 className="font-bold text-lg mb-1">Teach me this</h4>
                <p className="text-gray-600 dark:text-gray-400">
                  質問に対して分かりやすく段階的に解説
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <span className="text-3xl">✍️</span>
              <div>
                <h4 className="font-bold text-lg mb-1">Grade my essay</h4>
                <p className="text-gray-600 dark:text-gray-400">
                  英作文を採点＆詳細フィードバック
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <span className="text-3xl">🔍</span>
              <div>
                <h4 className="font-bold text-lg mb-1">Find my mistake</h4>
                <p className="text-gray-600 dark:text-gray-400">
                  誤りを見つけて、正しい答えと理由を提示
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <span className="text-3xl">🃏</span>
              <div>
                <h4 className="font-bold text-lg mb-1">Create flashcards</h4>
                <p className="text-gray-600 dark:text-gray-400">
                  暗記カードを自動生成
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <span className="text-3xl">🎥</span>
              <div>
                <h4 className="font-bold text-lg mb-1">Find a video</h4>
                <p className="text-gray-600 dark:text-gray-400">
                  関連するYouTube動画を検索
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <span className="text-3xl">🔊</span>
              <div>
                <h4 className="font-bold text-lg mb-1">Generate audio</h4>
                <p className="text-gray-600 dark:text-gray-400">
                  音声解説を生成
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <span className="text-3xl">🔬</span>
              <div>
                <h4 className="font-bold text-lg mb-1">Deeply Research</h4>
                <p className="text-gray-600 dark:text-gray-400">
                  深掘り調査レポート（プレミアム）
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <span className="text-3xl">📝</span>
              <div>
                <h4 className="font-bold text-lg mb-1">Predicted Test</h4>
                <p className="text-gray-600 dark:text-gray-400">
                  試験問題生成＆弱点分析（プレミアム）
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 料金プラン */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-8">料金プラン</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="card border-2 border-blue-500">
              <h3 className="text-2xl font-bold mb-4">無料プラン</h3>
              <div className="text-4xl font-bold mb-4">
                <span className="text-2xl">🎫</span> 15枚/日
              </div>
              <ul className="text-left space-y-2 mb-6">
                <li>✅ 毎日15枚のチケット配布</li>
                <li>✅ 基本5機能使い放題</li>
                <li>✅ 学年別対応</li>
                <li>✅ 履歴保存</li>
              </ul>
              <Link to="/register" className="btn-primary w-full">
                今すぐ始める
              </Link>
            </div>

            <div className="card border-2 border-yellow-500 bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900 dark:to-orange-900">
              <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white px-3 py-1 text-sm font-bold rounded-lg inline-block mb-4">
                PREMIUM
              </div>
              <h3 className="text-2xl font-bold mb-4">プレミアム機能</h3>
              <div className="text-4xl font-bold mb-4">
                <span className="text-2xl">💎</span> 5個/月
              </div>
              <ul className="text-left space-y-2 mb-6">
                <li>✅ 毎月5個のダイヤ配布</li>
                <li>✅ ロールオーバー可能</li>
                <li>✅ 深掘り調査機能</li>
                <li>✅ 試験問題生成＆分析</li>
              </ul>
              <Link to="/register" className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white font-semibold py-2 px-4 rounded-lg w-full inline-block">
                無料で体験
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
