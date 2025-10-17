import React, { useState } from 'react';
import PropTypes from 'prop-types';

function QuestionForm({ onSubmit }) {
  const [question, setQuestion] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    const trimmed = question.trim();
    if (!trimmed) return;
    if (typeof onSubmit === 'function') {
      onSubmit(trimmed);
    }
    setQuestion('');
  }

  return (
    <form onSubmit={handleSubmit} style={{ display:'flex', gap:8 }}>
      <input
        value={question}
        onChange={(e)=>setQuestion(e.target.value)}
        placeholder="Ask Q-Deli anything..."
        style={{ flex:1 }}
      />
      <button type="submit">Ask</button>
    </form>
  );
}

QuestionForm.propTypes = {
  onSubmit: PropTypes.func,
};

export default QuestionForm;
