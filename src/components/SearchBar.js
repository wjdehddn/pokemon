import React from 'react';
import './SearchBar.css';

const SearchBar = ({ setSearchTerm, isPokemonMode }) => {
  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className='searchbar'>
      <input
        type="text"
        placeholder={isPokemonMode ? "포켓몬 이름 또는 ID 검색" : "아이템 이름 또는 ID 검색"}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default SearchBar;