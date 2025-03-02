import React, { useState } from 'react';

// 포켓몬 타입 맞추기 컴포넌트
const PokemonTypeGuessing = ({ pokemon, difficulty, handleScore, handleNext }) => {
  const [answer, setAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const [isAnswered, setIsAnswered] = useState(false); // 정답 제출 여부

  // 오버레이 스타일 결정
  const getOverlayStyle = () => {
    if (difficulty === 'easy') {
      return { backgroundColor: 'rgba(0, 0, 0, 0)' }; // 약간 투명한 오버레이
    } else if (difficulty === 'medium') {
      return { backgroundColor: 'rgba(0, 0, 0, 0.8)' }; // 중간 투명도
    } else {
      return { backgroundColor: 'rgba(0, 0, 0, 0.95)' }; // 완전히 검은색
    }
  };

  // 제출 핸들러
  const handleSubmit = (e) => {
    e.preventDefault();

    // 입력값과 타입을 소문자와 공백 제거로 통일하여 비교
    const normalizedAnswer = answer.trim().toLowerCase();

    // pokemon.type이 배열인 경우, 각 타입의 type_ko를 소문자로 변환하여 비교
    const normalizedTypes = pokemon.type.map((type) => type.type_ko.toLowerCase());

    if (normalizedTypes.some((type) => type === normalizedAnswer)) {
      setFeedback('정답입니다!');
      handleScore(true);
    } else {
      setFeedback(`틀렸습니다! 정답은 ${pokemon.type.map((type) => type.type_ko).join(', ')}입니다.`);
      handleScore(false);
    }

    setIsAnswered(true); // 정답 제출 후 "다음" 버튼을 보여주기 위해 상태 업데이트
  };

  return (
    <div className="card-wrap quiz-wrap" >
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
          <p>다음 포켓몬의 타입은 무엇일까요?</p>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="포켓몬 타입을 입력하세요"
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

export default PokemonTypeGuessing;