import React from 'react';
import PropTypes from 'prop-types';

function ResultDisplay({ result }) {
  if (!result) {
    return <div style={{ color:'#aaa' }}>No result yet.</div>;
  }
  return (
    <div style={{ whiteSpace:'pre-wrap' }}>{result}</div>
  );
}

ResultDisplay.propTypes = {
  result: PropTypes.string,
};

export default ResultDisplay;
