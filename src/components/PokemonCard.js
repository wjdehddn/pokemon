import React from 'react';
import './PoketmonCard.css';
import { Link } from 'react-router-dom';

const PokemonCard = ({ pokemon, onBookmarkToggle, isBookmarked }) => {
  const handleBookmark = () => {
    // 부모 컴포넌트에서 전달받은 onBookmarkToggle 함수 호출
    onBookmarkToggle(pokemon.id); // pokemon.id를 사용하여 즐겨찾기 상태를 변경
  };

  return (
    <div className='card-wrap'>
      <Link to={`/pokemon/${pokemon.id}`}>
        <img src={pokemon.img_path} alt={pokemon.title} className='card-img' />
        <h3>{pokemon.title}</h3>
        <p>{pokemon.type.map((type, index) => (
          <span key={index}>{type.type_ko}{index < pokemon.type.length - 1 ? ', ' : ''}</span>
        ))}</p>
      </Link>
      <button
        onClick={handleBookmark}
        className='cardBtn'
        style={{
          backgroundColor: isBookmarked ? 'gold' : '#eee',
        }}
      >
        {isBookmarked ? '즐겨찾기' : '즐겨찾기'}
      </button>
    </div>
  );
};

export default PokemonCard;