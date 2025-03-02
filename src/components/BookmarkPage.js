import React, { useState, useEffect } from 'react';
import { pokemonData } from '../data/PoketMonMockData';
import { Link } from 'react-router-dom';
import PokemonCard from './PokemonCard';

const ITEMS_PER_PAGE = 42; // 한 페이지에 42개 카드

const Bookmarks = () => {
  // ✅ [1] localStorage에서 즐겨찾기 데이터 가져와서 초기값 설정
  const [bookmarkedIds, setBookmarkedIds] = useState(() => {
    const savedBookmarks = localStorage.getItem('bookmarkedPokemons');
    return savedBookmarks ? JSON.parse(savedBookmarks) : [];
  });

  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지

  // ✅ [2] bookmarkedIds가 변경될 때 localStorage 업데이트
  useEffect(() => {
    localStorage.setItem('bookmarkedPokemons', JSON.stringify(bookmarkedIds));
  }, [bookmarkedIds]);

  // 즐겨찾기된 포켓몬 목록 필터링
  const bookmarkedPokemonList = pokemonData.filter((pokemon) =>
    bookmarkedIds.includes(pokemon.id)
  );

  const totalPages = Math.ceil(bookmarkedPokemonList.length / ITEMS_PER_PAGE);
  const currentPageData = bookmarkedPokemonList.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  // ✅ [3] 즐겨찾기 상태 토글 함수
  const onBookmarkToggle = (pokemonId) => {
    const updatedBookmarks = bookmarkedIds.includes(pokemonId)
      ? bookmarkedIds.filter((id) => id !== pokemonId) // 이미 있는 경우 제거
      : [...bookmarkedIds, pokemonId]; // 없는 경우 추가

    setBookmarkedIds(updatedBookmarks);
  };

  // 페이지 버튼을 생성하는 로직
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
    <div className='wrap'>
      <h1 className='title'>즐겨찾기</h1>
      <div className='mode-wrap bookmark-wrap'>
        <Link className='moveBtn' to="/encyclopedia">
          도감 페이지로 돌아가기
        </Link>
      </div>

      <div className='card'>
        {currentPageData.length > 0 ? (
          currentPageData.map((pokemon) => (
            <PokemonCard
              key={pokemon.id}
              pokemon={pokemon}
              isBookmarked={true} // 즐겨찾기 된 상태
              onBookmarkToggle={onBookmarkToggle} // 토글 함수 전달
            />
          ))
        ) : (
          <p>즐겨찾기된 포켓몬이 없습니다.</p>
        )}
      </div>

      {/* 페이지네이션 */}
      <div className='pagenation'>
        <button className='leftBtn' onClick={() => handlePageChange(1)} disabled={currentPage === 1}>
          &lt;&lt;
        </button>
        <button className='leftBtn' onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
          &lt;
        </button>
        {generatePageButtons().map((button) => (
          <button className='leftBtn'
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

export default Bookmarks;