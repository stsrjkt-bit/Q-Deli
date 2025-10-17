import { AlertCircle } from 'lucide-react';

/**
 * エラーメッセージコンポーネント
 * 
 * @param {Object} props
 * @param {string} props.message - エラーメッセージ
 * @param {Function} props.onDismiss - 閉じるボタンのコールバック
 */
function ErrorMessage({ message, onDismiss }) {
  if (!message) return null;

  return (
    <div className="bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-700 rounded-lg p-4 mb-4">
      <div className="flex items-start">
        <AlertCircle className="text-red-600 dark:text-red-400 mr-2 flex-shrink-0" size={20} />
        <div className="flex-1">
          <p className="text-red-800 dark:text-red-200">{message}</p>
        </div>
        {onDismiss && (
          <button
            onClick={onDismiss}
            className="ml-2 text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-200"
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
}

export default ErrorMessage;
