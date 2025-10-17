import React, { useState } from 'react';
import QuestionForm from '../components/QuestionForm.jsx';
import ResultDisplay from '../components/ResultDisplay.jsx';

/**
 * Dedicated page for the Teach feature.
 * @returns {JSX.Element}
 */
export default function AnswerPage() {
  const [answer, setAnswer] = useState('');
  return (
    <div>
      <QuestionForm onAnswer={setAnswer} />
      <ResultDisplay text={answer} />
    </div>
  );
}
