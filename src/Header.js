import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <div className='header-container'>
            <div className='header-wrap'>
                <div className='header-left-wrap'>
                    <Link to='/'>
                        Pokémon
                    </Link>
                    
                    <button className={`menu-button ${menuOpen ? 'open' : ''}`} onClick={toggleMenu}>
                        {menuOpen ? '✖' : '☰'}
                    </button>
                    
                    <ul className={`nav-menu ${menuOpen ? 'active' : ''}`} onClick={toggleMenu}>
                        <li><Link to='/encyclopedia' className='header-nav-item'>도감</Link></li>
                        <li><Link to='/attribute' className='header-nav-item'>속성</Link></li>
                        <li><Link to='/party' className='header-nav-item'>팀</Link></li>
                        <li><Link to='/quiz' className='header-nav-item'>퀴즈</Link></li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Header;