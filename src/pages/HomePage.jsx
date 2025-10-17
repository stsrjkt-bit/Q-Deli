import React, { useState } from 'react';
import Navigation from '../components/Navigation';
import QuestionForm from '../components/QuestionForm';
import ResultDisplay from '../components/ResultDisplay';

function HomePage(){
  const [result, setResult] = useState('');

  function handleAsk(question){
    setResult(`Q: ${question}\nA: This is a placeholder answer from Q-Deli.`);
  }

  return (
    <div>
      <Navigation userName="Alex" />
      <div style={{ display:'grid', gap:12, padding:16 }}>
        <QuestionForm onSubmit={handleAsk} />
        <ResultDisplay result={result} />
      </div>
    </div>
  );
}

export default HomePage;
