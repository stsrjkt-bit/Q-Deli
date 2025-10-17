import { Link } from 'react-router-dom';
import clsx from 'clsx';

/**
 * 機能カードコンポーネント
 * ダッシュボードで使用
 * 
 * @param {Object} props
 * @param {string} props.title - 機能名
 * @param {string} props.description - 説明
 * @param {string} props.icon - アイコン（emoji）
 * @param {string} props.pointType - ポイントタイプ（'ticket' または 'diamond'）
 * @param {number} props.pointCost - 必要ポイント数
 * @param {string} props.to - リンク先
 * @param {string} props.bgColor - 背景色クラス
 */
function FeatureCard({ 
  title, 
  description, 
  icon, 
  pointType, 
  pointCost, 
  to, 
  bgColor = 'bg-blue-500' 
}) {
  const pointEmoji = pointType === 'diamond' ? '💎' : '🎫';
  const isPremium = pointType === 'diamond';

  return (
    <Link
      to={to}
      className={clsx(
        'card relative overflow-hidden group cursor-pointer transform hover:scale-105',
        isPremium && 'border-2 border-yellow-400'
      )}
    >
      {/* プレミアムバッジ */}
      {isPremium && (
        <div className="absolute top-0 right-0 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white px-3 py-1 text-xs font-bold rounded-bl-lg">
          PREMIUM
        </div>
      )}

      {/* アイコン */}
      <div className={clsx(
        'w-16 h-16 rounded-full flex items-center justify-center text-3xl mb-4 mx-auto',
        bgColor
      )}>
        {icon}
      </div>

      {/* タイトル */}
      <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
        {title}
      </h3>

      {/* 説明 */}
      <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
        {description}
      </p>

      {/* ポイント必要数 */}
      <div className="flex items-center justify-center space-x-1 text-lg font-semibold">
        <span>{pointEmoji}</span>
        <span>{pointCost}</span>
      </div>

      {/* ホバーエフェクト */}
      <div className={clsx(
        'absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300',
        bgColor
      )} />
    </Link>
  );
}

export default FeatureCard;
