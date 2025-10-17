import { CheckCircle } from 'lucide-react';

/**
 * 成功メッセージコンポーネント
 * 
 * @param {Object} props
 * @param {string} props.message - 成功メッセージ
 * @param {Function} props.onDismiss - 閉じるボタンのコールバック
 */
function SuccessMessage({ message, onDismiss }) {
  if (!message) return null;

  return (
    <div className="bg-green-100 dark:bg-green-900 border border-green-400 dark:border-green-700 rounded-lg p-4 mb-4">
      <div className="flex items-start">
        <CheckCircle className="text-green-600 dark:text-green-400 mr-2 flex-shrink-0" size={20} />
        <div className="flex-1">
          <p className="text-green-800 dark:text-green-200">{message}</p>
        </div>
        {onDismiss && (
          <button
            onClick={onDismiss}
            className="ml-2 text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-200"
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
}

export default SuccessMessage;
