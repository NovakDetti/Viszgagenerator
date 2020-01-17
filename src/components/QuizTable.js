import React from 'react';
import './QuizTableStyle.css';
import Questions from './Questions';

function QuizTable() {
  return (
    <div className="jumbotron margin-surround">
      <h1>Számhálók vizsgagenerátor</h1>
      <Questions />
    </div>
  );
}

export default QuizTable;
