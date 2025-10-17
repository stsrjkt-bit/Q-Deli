import React, { useState } from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../services/firebase.js';

/**
 * Login and signup form component using Firebase Authentication.
 * @param {{ onLogin: (user: import('firebase/auth').User) => void }} props
 * @returns {JSX.Element}
 */
export default function LoginForm({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mode, setMode] = useState('login');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      const action = mode === 'login' ? signInWithEmailAndPassword : createUserWithEmailAndPassword;
      const cred = await action(auth, email, password);
      onLogin?.(cred.user);
    } catch (err) {
      setError(err?.message || 'Authentication error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="card">
      <div className="section-title">{mode === 'login' ? 'ログイン' : '新規登録'}</div>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 8 }}>
          <input className="input" type="email" placeholder="メールアドレス" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div style={{ marginBottom: 8 }}>
          <input className="input" type="password" placeholder="パスワード" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        {error && <div className="small" style={{ color: '#ff7676' }}>{error}</div>}
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="button" type="submit" disabled={isLoading}>{isLoading ? '処理中...' : (mode === 'login' ? 'ログイン' : '登録')}</button>
          <button className="button" type="button" disabled={isLoading} onClick={() => setMode((m) => (m === 'login' ? 'signup' : 'login'))}>
            {mode === 'login' ? '新規登録へ' : 'ログインへ'}
          </button>
        </div>
      </form>
    </div>
  );
}
