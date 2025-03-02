import React, { useState } from "react";
import './Attribute.css';
import { typeData } from "../data/TypeMockData"; // 타입 데이터
import { pokemonData } from "../data/PoketMonMockData"; // 포켓몬 데이터

// 타입 선택 컴포넌트
const TypeSelector = ({ selectedType, setSelectedType, isSameType, setIsSameType }) => {
  return (
    <div className="damage-card type-selector">
      <label>공격 타입 선택: </label>
      <select value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
        <option value="">타입 선택</option>
        {typeData.map((type) => (
          <option key={type.id} value={type.type_en}>
            {type.type_ko}
          </option>
        ))}
      </select>
      
      {/* 자속기 체크박스 */}
      <label className="stab-checkbox">
        <input
          type="checkbox"
          checked={isSameType}
          onChange={(e) => setIsSameType(e.target.checked)}
        />
        자속기
      </label>
    </div>
  );
};


// 포켓몬 선택 컴포넌트 (검색 기능 추가)
const PokemonSelector = ({ selectedPokemon, setSelectedPokemon }) => {
  const [searchTerm, setSearchTerm] = useState("");

  // 중복 제거: 같은 이름과 타입 조합을 가진 포켓몬은 하나만 유지
  const uniquePokemons = pokemonData.filter(
    (pokemon, index, self) =>
      index ===
      self.findIndex(
        (t) =>
          t.title === pokemon.title && // 이름이 같은지 확인
          t.type.map((type) => type.type_en).sort().join(",") ===
            pokemon.type.map((type) => type.type_en).sort().join(",") // 타입 배열을 비교
      )
  );

  // 검색 조건에 맞는 포켓몬 필터링
  const filteredPokemons = uniquePokemons.filter((pokemon) =>
    pokemon.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="damage-card">
      <label>방어 포켓몬 검색: </label>
      <input
        type="text"
        placeholder="포켓몬 이름 검색"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <select
        value={selectedPokemon}
        onChange={(e) => setSelectedPokemon(e.target.value)}
      >
        <option value="">포켓몬 선택</option>
        {filteredPokemons.map((pokemon) => (
          <option key={pokemon.id} value={pokemon.en_title}>
            {pokemon.title} ({pokemon.type.map((type) => type.type_ko).join(", ")})
          </option>
        ))}
      </select>
    </div>
  );
};

// 데미지 표시 컴포넌트
const DamageDisplay = ({ damageMultiplier }) => {
  return (
    <div className="damage-card">
      <h3>데미지 배율: {damageMultiplier !== null ? damageMultiplier.toFixed(2) : "계산 안됨"}</h3>
    </div>
  );
};

const Attribute = () => {
  const [selectedType, setSelectedType] = useState("");
  const [selectedPokemon, setSelectedPokemon] = useState("");
  const [isSameType, setIsSameType] = useState(false);
  const [damageMultiplier, setDamageMultiplier] = useState(null);
  const [modalType, setModalType] = useState(null); // 모달에 표시할 타입 저장

  // 모달 열기
  const openModal = (type) => {
    if (window.innerWidth <= 1200) {
      setModalType(type);
    }
  };

  // 모달 닫기
  const closeModal = () => {
    setModalType(null);
  };

  // 데미지 계산 함수
  const calculateDamage = () => {
    if (!selectedType || !selectedPokemon) {
      setDamageMultiplier(null); // 선택되지 않은 경우 계산하지 않음
      return;
    }

    const attackType = typeData.find((type) => type.type_en === selectedType);
    const pokemon = pokemonData.find((pokemon) => pokemon.en_title === selectedPokemon);

    if (!attackType || !pokemon) {
      setDamageMultiplier(null); // 데이터가 없는 경우 계산하지 않음
      return;
    }

    let multiplier = 1; // 기본 배율

    // 포켓몬의 각 타입에 대해 데미지 계산
    pokemon.type.forEach((pokemonType) => {
      const defenseType = typeData.find((type) => type.type_en === pokemonType.type_en);
      if (defenseType) {
        const damageRatio = attackType.typeDamage_en[defenseType.type_en] || 1; // 공격 타입의 데미지 배율 가져오기
        multiplier *= damageRatio; // 배율 곱하기
      }
    });

    // 자속기 체크가 활성화된 경우
    if (isSameType) {
      multiplier *= 1.3; // 자속기 추가 배율 적용
    }

    setDamageMultiplier(multiplier); // 최종 배율 설정
  };

  // "계산하기" 버튼 클릭 시 데미지 재계산
  const handleCalculateClick = () => {
    calculateDamage();
  };

  return (
    <div className='wrap'>
      <h1 className='title'>포켓몬 속성표와 계산기</h1>
      
      {/* 속성표 */}
      <section>
        <h2>속성표</h2>
        <div className="type-wrap">
          {typeData.map((type) => (
            <div className="type-con" key={type.type_en}>
              <div className="type-img" onClick={() => openModal(type)}>
                <img src={type.img_path} alt={type.type_ko} />
                <h3>{type.type_ko}</h3>
              </div>
              <div className="type">
                {Object.entries(type.typeDamage_ko)
                  .filter(([_, multiplier]) => multiplier > 1)
                  .map(([strongType, _]) => {
                    const strongTypeData = typeData.find((t) => t.type_ko === strongType);
                    return strongTypeData ? (
                      <div className="type-strong" key={strongType}>
                        <img src={strongTypeData.img_path} alt={strongType} />
                        <div>{strongType}</div>
                      </div>
                    ) : (
                      <div className="type-strong" key={strongType}>
                        <div>X</div>
                        <div>없음</div>
                      </div>
                    );
                  })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 모달 */}
      {modalType && (
        <div className="modal">
          <div className="modal-content">
            <button className="close-btn" onClick={closeModal}>닫기</button>
            <h3>{modalType.type_ko}</h3>
            <div className="type">
              {Object.entries(modalType.typeDamage_ko)
                .filter(([_, multiplier]) => multiplier > 1)
                .map(([strongType, _]) => {
                  const strongTypeData = typeData.find((t) => t.type_ko === strongType);
                  return strongTypeData ? (
                    <div className="type-strong" key={strongType}>
                      <img src={strongTypeData.img_path} alt={strongType} />
                      <div>{strongType}</div>
                    </div>
                  ) : (
                    <div className="type-strong" key={strongType}>
                      <div>X</div>
                      <div>없음</div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      )}

      {/* 데미지 계산기 */}
      <div className="damage-wrap">
        <h2 id="damage-wrap-title">포켓몬 데미지 배율 계산기</h2>
        <div className="damage-card-wrap">
          <TypeSelector
            selectedType={selectedType}
            setSelectedType={setSelectedType}
            isSameType={isSameType}
            setIsSameType={setIsSameType}
          />
          <PokemonSelector selectedPokemon={selectedPokemon} setSelectedPokemon={setSelectedPokemon} />
          <button className="moveBtn" onClick={handleCalculateClick}>계산하기</button>
          {damageMultiplier !== null && <DamageDisplay damageMultiplier={damageMultiplier} />}
        </div>
      </div>
    </div>
  );
};

export default Attribute;