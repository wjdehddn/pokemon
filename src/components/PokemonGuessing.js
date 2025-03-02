import React, { useState } from "react";
import './PokemonGuessing.css'

const PokemonGuessing = ({ pokemon, difficulty, handleScore, handleNext }) => {
  const [answer, setAnswer] = useState(""); // 사용자의 입력
  const [feedback, setFeedback] = useState(""); // 정답 피드백
  const [isAnswered, setIsAnswered] = useState(false); // 정답 제출 여부

  // 난이도에 따른 오버레이 스타일 결정
  const getOverlayStyle = () => {
    if (difficulty === "easy") {
      return { backgroundColor: "rgba(0, 0, 0, 0)" }; // 완전히 투명
    } else if (difficulty === "medium") {
      return { backgroundColor: "rgba(0, 0, 0, 0.8)" }; // 중간 투명도
    } else {
      return { backgroundColor: "rgba(0, 0, 0, 0.95)" }; // 거의 검은색
    }
  };

  // 정답 제출 처리
  const handleSubmit = (e) => {
    e.preventDefault(); // 기본 동작 방지

    // 사용자 입력과 포켓몬 이름을 소문자/공백 제거 후 비교
    const normalizedAnswer = answer.trim().toLowerCase();
    const normalizedPokemonName = pokemon.title.trim().toLowerCase();

    if (normalizedAnswer === normalizedPokemonName) {
      setFeedback("정답입니다!");
      handleScore(true); // 점수 증가
    } else {
      setFeedback(`틀렸습니다! 정답은 ${pokemon.title}입니다.`);
      handleScore(false); // 점수 유지
    }
    setIsAnswered(true); // 정답 제출 상태로 전환
  };

  return (
    <div className="quiz-wrap">
      {/* 포켓몬 이미지 */}
      <div className="img-wrap">
        <img src={pokemon.img_path} alt={pokemon.title}/>
        {/* 난이도에 따른 오버레이 */}
        <div className="img-cover"
          style={{...getOverlayStyle()}}
        ></div>
      </div>

      {/* 문제 텍스트와 입력 칸 */}
      {!isAnswered && (
        <div className="text-wrap">
          <p>다음 포켓몬의 이름은 무엇일까요?</p>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="포켓몬 이름을 입력하세요"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              required
            />
            <button type="submit">제출</button>
          </form>
        </div>
      )}

      {/* 피드백 */}
      <p className="feedback">{feedback}</p>

      {/* "다음" 버튼 */}
      {isAnswered && (
        <button className="answer"
          onClick={() => {
            handleNext(); // 다음 문제로 이동
            setIsAnswered(false); // "다음" 클릭 시 입력 폼 다시 표시
            setAnswer(''); // 답 입력란 초기화
            setFeedback(''); // 피드백 초기화
          }}
        >
          다음
        </button>
      )}
    </div>
  );
};

export default PokemonGuessing;