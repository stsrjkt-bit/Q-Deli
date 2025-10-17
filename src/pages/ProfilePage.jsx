import React from 'react';
import { auth } from '../services/firebase.js';

/**
 * Minimal profile page showing the current user's email if logged in.
 * @returns {JSX.Element}
 */
export default function ProfilePage() {
  const user = auth.currentUser;
  return (
    <div className="card">
      <div className="section-title">プロフィール</div>
      {user ? (
        <div>メール: {user.email}</div>
      ) : (
        <div>未ログイン</div>
      )}
    </div>
  );
}
