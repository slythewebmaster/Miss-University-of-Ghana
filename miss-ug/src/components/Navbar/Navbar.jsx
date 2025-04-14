import React, { useState, useEffect } from 'react';
import './Navbar.css';
import logo from '../../assets/Logo_1.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['Hero', 'About', 'Highlight', 'Register', 'Contact'];
      for (let id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(id);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className="navbar">
      <div className="container">
        <img src={logo} alt="Logo" className="logo" />
        <div className={`nav-toggle ${isOpen ? 'open' : ''}`} onClick={toggleMenu}>
          <span />
          <span />
          <span />
        </div>
        <ul className={`nav-links ${isOpen ? 'show' : ''}`}>
          {['Hero', 'About', 'Highlight', 'Register', 'Contact'].map((item) => (
            <li key={item}>
              <a
                href={`#${item}`}
                className={activeSection === item ? 'active' : ''}
                onClick={() => setIsOpen(false)}
              >
                {item === 'Hero' ? 'Home' : item.replace(/([A-Z])/g, ' $1')}
              </a>
            </li>
          ))}
          <li>
            <a href="/admin">Login</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
