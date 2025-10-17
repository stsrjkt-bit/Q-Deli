import React, { useState } from 'react';
import LoginForm from '../components/LoginForm.jsx';
import QuestionForm from '../components/QuestionForm.jsx';
import ResultDisplay from '../components/ResultDisplay.jsx';

/**
 * Home page with login and question submission.
 * @returns {JSX.Element}
 */
export default function HomePage() {
  const [user, setUser] = useState(null);
  const [answer, setAnswer] = useState('');
  return (
    <div>
      {!user && <LoginForm onLogin={setUser} />}
      {user && (
        <>
          <div className="card">ようこそ、{user.email}</div>
          <QuestionForm onAnswer={setAnswer} />
          <ResultDisplay text={answer} />
        </>
      )}
    </div>
  );
}
