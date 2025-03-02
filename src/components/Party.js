import React, { useState } from 'react';
import { pokemonPartyData } from '../data/PoketMonPartyMockData';
import { Link } from 'react-router-dom';
import './Party.css';

const Party = () => {
  const [battleType, setBattleType] = useState('single');

  // 선택된 배틀 타입에 맞는 파티 필터링 (데이터가 없을 경우 빈 배열)
  const filteredParties = (pokemonPartyData || []).filter(party => party.battleType === battleType);

  return (
    <div className='wrap'>
      <h1 className='title'>포켓몬 파티</h1>
      <button className='mode modeleft mode-party' onClick={() => setBattleType('single')} style={{ backgroundColor: battleType === 'single' ? '#FFD700' : '#fff', border: battleType === 'single' ? '0' : '1px solid #ccc'}}>싱글 배틀</button>
      <button className='mode moderight' onClick={() => setBattleType('double')} style={{ backgroundColor: battleType === 'double' ? '#FFD700' : '#fff', border: battleType === 'double' ? '0' : '1px solid #ccc'}}>더블 배틀</button>

      <h2>{battleType === 'single' ? '싱글 배틀 파티들' : '더블 배틀 파티들'}</h2>

      {filteredParties.map((party) => (
        <div className='party-wrap' key={party.id}>
          {/* 파티 이름 */}
          <h3>{party.title}</h3>

          {/* 포켓몬 이미지 리스트 */}
          <div className='party-img-wrap'>
            {party.party.map((pokemon) => (
              <div className='party-img' key={pokemon.name}>
                <img src={pokemon.img_path} alt={pokemon.name}/>
                <h2>{pokemon.name}</h2>
              </div>
            ))}
          </div>

          {/* 자세히 보기 버튼 */}
          <Link className='moveBtn move' to={`/party/${party.id}`}>
            자세히 보기
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Party;