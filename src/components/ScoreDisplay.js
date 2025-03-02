import React from 'react';
import './ScoreDisplay.css';

// 점수 표시 컴포넌트
const ScoreDisplay = ({ score, total, restartQuiz }) => {

  return (
    <div className="score-wrap">
      <h2>퀴즈 완료!</h2>
      <img src='https://cdn-icons-png.flaticon.com/512/1286/1286612.png'/>
      <p>당신의 점수: {score} / {total}</p>
      <button className='moveBtn' onClick={restartQuiz}>다시하기</button>
    </div>
  );
};

export default ScoreDisplay;