import React from 'react';
import './QuizTableStyle.css';
import Questions from './Questions';

function QuizTable() {
  return (
    <div>
      <h1 className="title">Számhálók vizsgagenerátor</h1>
      <div className="jumbotron margin-surround">
        <Questions />
      </div>
    </div>
  );
}

export default QuizTable;
