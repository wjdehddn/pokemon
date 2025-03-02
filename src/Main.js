import React from 'react';
import { motion } from "framer-motion";
import { Link } from 'react-router-dom';
import { pokemonData } from './data/PoketMonMockData';
import './Main.css';
import { typeData } from './data/TypeMockData';

const Main = () => {
  const topPokemons = pokemonData.slice(0, 7);

  return (
    <div className="main-container">
      {/* 섹션1: 애니메이션 캐러셀 */}
      <div className="main-section">
        <motion.h1
          className="pokemon-title"
          initial={{ x: "-100vw", scale: 0.5, opacity: 0 }}
          animate={{ x: 0, scale: 1.5, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          Pokémon
        </motion.h1>
      </div>

      {/* 섹션2: 도감 페이지 */}
      <section className="section pokedex-section">
        <h2>도감</h2>
        <div className="pokedex-list">
          {topPokemons.map((pokemon) => (
            <div className="pokemon-card" key={pokemon.id}>
              <Link to={`/encyclopedia`} className="pokemon-link">
                <img src={pokemon.img_path} alt={pokemon.title} className="pokemon-img" />
                <h3>{pokemon.title}</h3>
                <p>
                  {pokemon.type.map((type, index) => (
                    <span key={index}>{type.type_ko}{index < pokemon.type.length - 1 ? ', ' : ''}</span>
                  ))}
                </p>
                <button className="bookmark-btn">즐겨찾기</button>
              </Link>
            </div>
          ))}
        </div>
        <Link to="/encyclopedia" className="section-button">도감 페이지로 가기</Link>
      </section>

      {/* 섹션3: 속성 페이지 */}
      <section className="section attributes-section">
        <h2>속성</h2>
        <div className='attribute'>
          {typeData.map((type) => (
            <div className="type-con" key={type.type_en}>
              <div className="type-img">
                <img
                  src={type.img_path}
                  alt={type.type_ko}
                />
                <h3>{type.type_ko}</h3>
              </div>
            </div>
          ))}
        </div>
        <Link to="/attribute" className="section-button">속성 페이지로 가기</Link>
      </section>

      {/* 섹션4: 팀 및 퀴즈 페이지 */}
      <section className="section team-quiz-section">
        <div className='team-section'>
          <img src='https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FmOCmf%2FbtqMeGhI43n%2F6KYSVZf0OdnvB5D3tlAbk1%2Fimg.png'/>
          <Link to="/party" className="team-button">파티 페이지</Link>
        </div>
        <div className='quiz-section'>
          <div className='quiz-sec-img-wrap'>
            <img src='https://cnqnq6x1162u.objectstorage.ap-seoul-1.oci.customer-oci.com/p/4d_DJXYmI0ejd8avuhAILIIpyZqnmHvpQPxB3i9g9MKd65-abwpaD-tq-jraNd1k/n/cnqnq6x1162u/b/machugi-image/o/3b65d644-b08d-4dc8-a32b-a87ca1786a31.png' />
          </div>
          <Link to="/quiz" className="quiz-button">퀴즈 페이지</Link>
        </div>
      </section>
    </div>
  );
};

export default Main;