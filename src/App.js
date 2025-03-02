import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';

import Header from './Header';

import Home from './Home';

import Footer from './Footer';

import Encyclopedia from './components/Encyclopedia';
import PokemonDetail from './components/PokemonDetail';
import ItemDetail from './components/ItemDetail';
import BookmarkPage from './components/BookmarkPage';
import Attribute from './components/Attribute';
import Party from './components/Party';
import PartyDetail from './components/PartyDetail';
import Quiz from './components/Quiz';
import { useState, useEffect } from 'react';

function App() {
  const [showTopButton, setShowTopButton] = useState(false);

  // 스크롤 이벤트 핸들러
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setShowTopButton(true);
      } else {
        setShowTopButton(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // 페이지 상단으로 이동하는 함수
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="root-wrap">
      <BrowserRouter>
        <Header/>
        <main className="main-content">
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/encyclopedia' element={<Encyclopedia/>}/>
            <Route path='/pokemon/:id' element={<PokemonDetail />} />
            <Route path="/item/:id" element={<ItemDetail />} />
            <Route path="/bookmarks" element={<BookmarkPage />} />
            <Route path='/attribute' element={<Attribute/>}/>
            <Route path='/party' element={<Party/>}/>
            <Route path="/party/:id" element={<PartyDetail />} />
            <Route path='/quiz' element={<Quiz/>}/>
          </Routes>
          {showTopButton && (
            <button className="top-button" onClick={scrollToTop}>▲ Top</button>
          )}
        </main>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;