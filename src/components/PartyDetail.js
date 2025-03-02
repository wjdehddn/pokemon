import React from 'react';
import './PartyDetail.css';
import { useParams, useNavigate } from 'react-router-dom';
import { pokemonPartyData } from '../data/PoketMonPartyMockData';

const PartyDetail = () => {
  // URL 파라미터에서 파티 ID 추출
  const { id } = useParams();
  const navigate = useNavigate();

  // 해당 ID에 맞는 파티 데이터 찾기
  const party = pokemonPartyData.find(party => party.id === Number(id));

  if (!party) return <h2>파티를 찾을 수 없습니다.</h2>;

  return (
    <div className='wrap'>
      <h1 className='party-title'>{party.title}</h1>
      {/* 파티에 포함된 모든 포켓몬의 상세 정보 표시 */}
      <div className='party'>
        {party.party.map((pokemon) => (
          <div className='party-info' key={pokemon.name}>
            <div className='info-wrap'>
              <div className='info'>
                <img className='pokemon-img' src={pokemon.img_path} alt={pokemon.name} />
                <img className='item-img' src={pokemon.equipment.img_path} alt={pokemon.equipment.name_ko}/>
                <ul>
                  {pokemon.type.map((t, index) => (
                    <li key={index}>
                      <img src={t.img_path} alt={t.type_ko}/> {t.type_ko}
                    </li>
                  ))}
                </ul>
              </div>
              <h2>{pokemon.name} ({pokemon.equipment.name_ko})</h2>
              <p>{pokemon.personality.name_ko}</p>
              <p>{pokemon.effort}</p>
              <p>{pokemon.traits.name_ko}</p>
            </div>
            <div className='tech-wrap'>
              <ul>
                {pokemon.technology.map((tech, index) => (
                  <li key={index}>
                    <img src={tech.img_path} alt={tech.technology_ko}/> {tech.technology_ko}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
      {/* 뒤로 가기 버튼 */}
      <button className='moveBtn back' onClick={() => navigate(-1)}>뒤로 가기</button>
    </div>
  );
};

export default PartyDetail;