import React, { useState } from 'react';
import PokemonCard from './PokemonCard';

const PokemonList = ({ pokemons = [] }) => {
  const [bookmarkedIds, setBookmarkedIds] = useState(() => {
    const savedBookmarks = JSON.parse(localStorage.getItem('bookmarkedPokemons')) || [];
    return savedBookmarks;
  });

  const handleBookmarkToggle = (pokemonId) => {
    const newBookmarkedIds = bookmarkedIds.includes(pokemonId)
      ? bookmarkedIds.filter(id => id !== pokemonId)
      : [...bookmarkedIds, pokemonId];

    setBookmarkedIds(newBookmarkedIds);
    localStorage.setItem('bookmarkedPokemons', JSON.stringify(newBookmarkedIds));
  };

  if (!Array.isArray(pokemons)) {
    return <p>데이터를 불러오는 중에 오류가 발생했습니다.</p>;
  }

  return (
    <div>
      {pokemons.map(pokemon => (
        <PokemonCard
          key={pokemon.id}
          pokemon={pokemon}
          onBookmarkToggle={handleBookmarkToggle}
          isBookmarked={bookmarkedIds.includes(pokemon.id)}
        />
      ))}
    </div>
  );
};

export default PokemonList;