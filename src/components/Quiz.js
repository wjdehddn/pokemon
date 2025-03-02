import React, { useState } from "react";
import PokemonGuessing from "./PokemonGuessing";
import PokemonTypeGuessing from "./PokemonTypeGuessing";
import ScoreDisplay from "./ScoreDisplay";
import { pokemonData } from "../data/PoketMonMockData";
import './Quiz.css';

const Quiz = () => {
  const [quizMode, setQuizMode] = useState(null); // 선택된 퀴즈 모드
  const [difficulty, setDifficulty] = useState(null); // 선택된 난이도
  const [quizInProgress, setQuizInProgress] = useState(false); // 퀴즈 진행 상태
  const [score, setScore] = useState(0); // 점수
  const [currentQuestion, setCurrentQuestion] = useState(0); // 현재 질문 번호
  const [questions, setQuestions] = useState([]); // 퀴즈 질문들
  const [reset, setReset] = useState(false); // 문제 리셋을 위한 상태

  // 퀴즈 시작
  const startQuiz = (selectedDifficulty) => {
    setDifficulty(selectedDifficulty);
    const generatedQuestions = generateQuestions(selectedDifficulty);
    setQuestions(generatedQuestions);
    setQuizInProgress(true);
    setScore(0);
    setCurrentQuestion(0);
    setReset(false); // 퀴즈 시작 시 리셋 상태 초기화
  };

  // 질문 생성 로직
  const generateQuestions = (level) => {
    const total = 10; // 총 질문 수
    let generated = [];
    for (let i = 0; i < total; i++) {
      const pokemon = pokemonData[Math.floor(Math.random() * pokemonData.length)];
      generated.push({ mode: quizMode, data: pokemon });
    }
    return generated;
  };

  // 점수 업데이트
  const handleScore = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
    }
  };

  // 문제 넘어가기
  const handleNext = () => {
    setReset(!reset); // 문제 리셋 상태 변경
    setCurrentQuestion(currentQuestion + 1); // 다음 문제로 이동
  };

  // 퀴즈 재시작
  const restartQuiz = () => {
    setQuizMode(null);
    setDifficulty(null);
    setQuizInProgress(false);
    setScore(0);
    setCurrentQuestion(0);
    setQuestions([]);
    setReset(false); // 퀴즈 재시작 시 리셋 상태 초기화
  };

  return (
    <div className="wrap">
      <h1 className='title'>포켓몬 퀴즈</h1>
      {!quizMode ? (
        <div className="start-section">
          <h2>퀴즈 모드를 선택하세요</h2>
          <div className="quiz-mode">
            <div className="quiz quiz-name">
              <img src="https://cnqnq6x1162u.objectstorage.ap-seoul-1.oci.customer-oci.com/p/4d_DJXYmI0ejd8avuhAILIIpyZqnmHvpQPxB3i9g9MKd65-abwpaD-tq-jraNd1k/n/cnqnq6x1162u/b/machugi-image/o/3b65d644-b08d-4dc8-a32b-a87ca1786a31.png"/>
              <button className="moveBtn" onClick={() => setQuizMode("name")}>포켓몬 이름 맞추기</button>
            </div>
            <div className="quiz quiz-type">
              <img src="https://mblogthumb-phinf.pstatic.net/MjAyMzA2MDNfMjcg/MDAxNjg1Nzg3NDE5NjM2.W2rCSjG1IlFfIU_CXBm-JIt18lqbLFiiDJU9UWpoCG0g.m9ZkABwMd85qVDg9SclD28fU-PcME8_Is42X3zUqWNMg.PNG.anjffh09/%ED%8F%AC%EC%BC%93%EB%AA%AC.PNG?type=w800"/>
              <button className="moveBtn" onClick={() => setQuizMode("type")}>포켓몬 속성 맞추기</button> 
            </div>
          </div>
        </div>
      ) : !difficulty ? (
        <div className="difficulty-section">
          <h2>난이도를 선택하세요</h2>
          <div className="quiz">
            {quizMode === 'name' ? (<img src="https://cnqnq6x1162u.objectstorage.ap-seoul-1.oci.customer-oci.com/p/4d_DJXYmI0ejd8avuhAILIIpyZqnmHvpQPxB3i9g9MKd65-abwpaD-tq-jraNd1k/n/cnqnq6x1162u/b/machugi-image/o/3b65d644-b08d-4dc8-a32b-a87ca1786a31.png"/>
            ) : (<img src="https://mblogthumb-phinf.pstatic.net/MjAyMzA2MDNfMjcg/MDAxNjg1Nzg3NDE5NjM2.W2rCSjG1IlFfIU_CXBm-JIt18lqbLFiiDJU9UWpoCG0g.m9ZkABwMd85qVDg9SclD28fU-PcME8_Is42X3zUqWNMg.PNG.anjffh09/%ED%8F%AC%EC%BC%93%EB%AA%AC.PNG?type=w800"/>)}
            <div className="btn-wrap">
              <button className="moveBtn" onClick={() => startQuiz("easy")}>초급</button>
              <button className="moveBtn" onClick={() => startQuiz("medium")}>중급</button>
              <button className="moveBtn" onClick={() => startQuiz("hard")}>고급</button>
            </div>
          </div>
        </div>
      ) : quizInProgress && currentQuestion < questions.length ? (
        quizMode === "name" ? (
          <PokemonGuessing
            pokemon={questions[currentQuestion].data}
            difficulty={difficulty}
            handleScore={handleScore}
            handleNext={handleNext}
            reset={reset}
          />
        ) : (
          <PokemonTypeGuessing
            pokemon={questions[currentQuestion].data}
            difficulty={difficulty}
            handleScore={handleScore}
            handleNext={handleNext}
            reset={reset}
          />
        )
      ) : (
        <ScoreDisplay
          score={score}
          total={questions.length}
          restartQuiz={restartQuiz}
        />
      )}
    </div>
  );
};

export default Quiz;