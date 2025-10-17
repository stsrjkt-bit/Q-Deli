import React from 'react';
import Navigation from '../components/Navigation';
import ResultDisplay from '../components/ResultDisplay';

function AnswerPage(){
  return (
    <div>
      <Navigation userName="Alex" />
      <div style={{ padding:16 }}>
        <ResultDisplay result={'Sample answer goes here.'} />
      </div>
    </div>
  );
}

export default AnswerPage;
