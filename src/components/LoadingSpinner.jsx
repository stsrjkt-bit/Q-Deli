import clsx from 'clsx';

/**
 * ローディングスピナーコンポーネント
 * 
 * @param {Object} props
 * @param {string} props.size - サイズ（'sm', 'md', 'lg'）
 * @param {string} props.message - 表示メッセージ
 */
function LoadingSpinner({ size = 'md', message = '処理中...' }) {
  const sizeClasses = {
    sm: 'h-6 w-6',
    md: 'h-12 w-12',
    lg: 'h-16 w-16'
  };

  return (
    <div className="flex flex-col items-center justify-center py-8">
      <div
        className={clsx(
          'animate-spin rounded-full border-b-2 border-blue-600',
          sizeClasses[size]
        )}
      />
      {message && (
        <p className="mt-4 text-gray-600 dark:text-gray-400">{message}</p>
      )}
    </div>
  );
}

export default LoadingSpinner;
