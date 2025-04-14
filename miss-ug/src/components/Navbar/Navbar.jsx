import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import logo from '../../assets/Logo_1.png';

const Navbar = () => {
  return (
    <nav className='container'>
        <img src={logo} alt="Logo" className='logo' />
        <ul className='nav-links'>
            <li><Link to="#Hero">Home</Link></li>  {/* Update this with your actual route */}
            <li><Link to="#About">About Us</Link></li>  {/* Update this with your actual route */}
            <li><Link to="#Highlight">Highlight</Link></li>  {/* Update this with your actual route */}
            <li><Link to="#Register">Register Now</Link></li>  {/* Update this with your actual route */}
            <li><Link to="#Contact">Contact Us</Link></li>  {/* Update this with your actual route */}
            <li><Link to="/admin">Login</Link></li>  {/* Update this with your actual route */}
        </ul>
    </nav>
  );
};

export default Navbar;