import React, { useState } from 'react';
import { postTeachMe } from '../services/api.js';
import { getIdTokenSafe } from '../utils/auth.js';

/**
 * Question submission form for "Teach me" feature.
 * @param {{ onAnswer: (text: string) => void }} props
 * @returns {JSX.Element}
 */
export default function QuestionForm({ onAnswer }) {
  const [question, setQuestion] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAsk = async (e) => {
    e.preventDefault();
    if (!question.trim()) {
      setError('質問を入力してください');
      return;
    }
    setError('');
    setIsLoading(true);
    try {
      const token = await getIdTokenSafe();
      const result = await postTeachMe({ question }, token);
      onAnswer?.(result?.data?.answer || '');
    } catch (err) {
      setError(err?.message || 'エラーが発生しました');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="card">
      <div className="section-title">Teach me this</div>
      <form onSubmit={handleAsk}>
        <textarea rows={6} className="input" value={question} onChange={(e) => setQuestion(e.target.value)} placeholder="英語学習の質問を入力..." />
        {error && <div className="small" style={{ color: '#ff7676', marginTop: 8 }}>{error}</div>}
        <div style={{ marginTop: 8 }}>
          <button className="button" type="submit" disabled={isLoading}>{isLoading ? '問い合わせ中...' : '送信'}</button>
        </div>
      </form>
    </div>
  );
}
