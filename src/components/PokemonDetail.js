import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { pokemonData } from '../data/PoketMonMockData';
import './PoketmonDetail.css';

const PokemonDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const pokemon = pokemonData.find(p => p.id.toString() === id);

  if (!pokemon) {
    return <p className="pokemon-detail">포켓몬을 찾을 수 없습니다.</p>;
  }

  return (
    <div className="pokemon-detail">
      <img src={pokemon.img_path} alt={pokemon.title} />
      <div className="pokemon-info">
        <h1>{pokemon.title} (#{pokemon.id})</h1>
        <p><strong>타입:</strong> {pokemon.type.map(t => t.type_ko).join(', ')}</p>
        <p><strong>특성:</strong> {pokemon.traits.map(t => t.name_ko).join(', ')}</p>
        <p><strong>특성 설명:</strong> {pokemon.traits.map(t => t.effect_ko).join(', ')}</p>
        <p><strong>신체 정보:</strong> 키 {pokemon.height}, 몸무게 {pokemon.weight}</p>
        <p><strong>종족치:</strong> {pokemon.race_value} (총합: {pokemon.total_race_value})</p>
        <p><strong>잡을 확률:</strong> {pokemon.catch_rate}</p>
      </div>
      <button className='moveBtn back' onClick={() => navigate(-1)}>뒤로 가기</button>
    </div>
  );
};

export default PokemonDetail;