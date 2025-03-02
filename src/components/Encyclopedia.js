import React, { useState } from 'react';
import './Encyclopedia.css';
import { typeData } from '../data/TypeMockData'; // typeData 사용
import { pokemonData } from '../data/PoketMonMockData';
import { equipmentData } from '../data/EquipmentMockData'; // 아이템 도감 목데이터
import SearchBar from './SearchBar';
import FilterPanel from './FilterPanel';
import PokemonCard from './PokemonCard';
import ItemCard from './ItemCard'; // 아이템 카드 컴포넌트
import { Link } from 'react-router-dom';

const ITEMS_PER_PAGE = 42; // 한 페이지에 42개 카드

const Encyclopedia = () => {
  const [filters, setFilters] = useState(typeData.map(type => type.type_ko)); // 기본값: 전체 체크
  const [searchTerm, setSearchTerm] = useState(''); // 검색어 상태
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const [bookmarkedIds, setBookmarkedIds] = useState(() => {
    const savedBookmarks = JSON.parse(localStorage.getItem('bookmarkedPokemons')) || [];
    return savedBookmarks;
  });
  const [isPokemonMode, setIsPokemonMode] = useState(true); // 현재 도감 모드 (포켓몬/아이템)

  const handleBookmarkToggle = (pokemonId) => {
    const newBookmarkedIds = bookmarkedIds.includes(pokemonId)
      ? bookmarkedIds.filter((id) => id !== pokemonId)
      : [...bookmarkedIds, pokemonId];

    setBookmarkedIds(newBookmarkedIds);
    localStorage.setItem('bookmarkedPokemons', JSON.stringify(newBookmarkedIds));
  };

  // 🔽 포켓몬 필터링
  const filteredPokemonList = pokemonData.filter((pokemon) => {
    if (filters.length === 0) return false; // 필터가 비어 있으면 아무것도 출력 X
    
    const matchesSearch =
      pokemon.title.toLowerCase().includes(searchTerm.toLowerCase()) || // 한국어 이름 검색
      pokemon.en_title.toLowerCase().includes(searchTerm.toLowerCase()) || // 영어 이름 검색
      pokemon.id.toString() === searchTerm; // ID 검색

    const matchesFilter =
      filters.length === typeData.length || // 전체 타입 선택 시 필터 적용 안 함
      filters.some((filterType) =>
        pokemon.type.some((typeObj) => typeObj.type_ko === filterType)
      );

    return matchesSearch && matchesFilter;
  });

  // 🔽 아이템 필터링
  const filteredItemList = equipmentData.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.id.toString() === searchTerm
  );

  const totalPages = Math.ceil(
    (isPokemonMode ? filteredPokemonList.length : filteredItemList.length) / ITEMS_PER_PAGE
  );

  const currentPageData = (isPokemonMode ? filteredPokemonList : filteredItemList).slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const generatePageButtons = () => {
    const startPage = Math.floor((currentPage - 1) / 10) * 10 + 1; // 10페이지 단위 시작
    const endPage = Math.min(startPage + 9, totalPages); // 10페이지 단위 종료

    const pagesToShow = [];
    for (let i = startPage; i <= endPage; i++) {
      pagesToShow.push(i);
    }

    return pagesToShow;
  };

  return (
    <div className='wrap' >
      <h1 className='title'>{isPokemonMode ? '포켓몬 도감' : '아이템 도감'}</h1>

      {/* 도감 모드 전환 버튼 */}
      <div className='btn-wrap'>
        <div className='mode-wrap'>
          <button className='mode modeleft' onClick={() => setIsPokemonMode(true)} style={{ backgroundColor: isPokemonMode ? '#FFD700' : '#fff', border: isPokemonMode ? '0' : '1px solid #ccc'}}>
            포켓몬 도감
          </button>
          <button className='mode moderight' onClick={() => setIsPokemonMode(false)} style={{ backgroundColor: isPokemonMode ? '#fff' : '#FFD700', border: isPokemonMode ? '1px solid #ccc' : '0'}}>아이템 도감</button>
          <SearchBar setSearchTerm={setSearchTerm} isPokemonMode={isPokemonMode} />
        </div>

        <Link className='moveBtn'
          to="/bookmarks"
          style={{
            display: isPokemonMode ? 'inline-block' : 'none', // 포켓몬 도감 모드일 때만 보이게 함
          }}
        >
          즐겨찾기 페이지로 이동
        </Link>
      </div>

      {/* 포켓몬 도감 모드일 때만 필터 패널 표시 */}
      {isPokemonMode && <FilterPanel setFilters={setFilters} />}

      {/* 포켓몬 도감 */}
      {isPokemonMode ? (
        <div className='card' >
          {currentPageData.length > 0 ? (
            currentPageData.map((pokemon) => (
              <PokemonCard
                key={pokemon.id}
                pokemon={pokemon}
                onBookmarkToggle={handleBookmarkToggle}
                isBookmarked={bookmarkedIds.includes(pokemon.id)}
              />
            ))
          ) : (
            <p>조건에 맞는 포켓몬이 없습니다.</p>
          )}
        </div>
      ) : (
        // 아이템 도감
        <div className='card' >
          {currentPageData.length > 0 ? (
            currentPageData.map((item) => (
              <ItemCard key={item.id} item={item} />
            ))
          ) : (
            <p>조건에 맞는 아이템이 없습니다.</p>
          )}
        </div>
      )}

      {/* 페이지네이션 */}
      <div className='pagenation' >
        <button className='leftBtn' onClick={() => handlePageChange(1)} disabled={currentPage === 1}>
          &lt;&lt;
        </button>
        <button className='leftBtn' onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
          &lt;
        </button>
        {generatePageButtons().map((button) => (
          <button className='pageBtn'
            key={button}
            onClick={() => handlePageChange(button)}
            style={{
              color: button === currentPage ? '#FFD700' : '#000',
            }}
          >
            {button}
          </button>
        ))}
        <button className='rightBtn' onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
          &gt;
        </button>
        <button className='rightBtn' onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages}>
          &gt;&gt;
        </button>
      </div>
    </div>
  );
};

export default Encyclopedia;