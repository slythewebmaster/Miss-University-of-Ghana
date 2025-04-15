import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Navbar.css';
import logo from '../../assets/Logo_1.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNavClick = (id) => {
    setIsOpen(false);

    if (location.pathname !== '/') {
      // Navigate to home and wait, then scroll
      navigate('/');
      setTimeout(() => scrollToSection(id), 300);
    } else {
      scrollToSection(id);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['Hero', 'Legacy', 'About', 'Register', 'Contact'];
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

  const navItems = [
    { id: 'Hero', label: 'Home' },
    { id: 'Legacy', label: 'Legacy' },
    { id: 'About', label: 'About' },
    { id: 'Register', label: 'Register' },
    { id: 'Contact', label: 'Contact Us' }
  ];

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
          {navItems.map(({ id, label }) => (
            <li key={id}>
              <button
                className={activeSection === id ? 'active' : ''}
                onClick={() => handleNavClick(id)}
              >
                {label}
              </button>
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
