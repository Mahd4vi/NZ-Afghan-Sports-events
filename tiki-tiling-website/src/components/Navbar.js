import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// import './Navbar.css'; // Optional: if we decide to separate Navbar CSS

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          Tiki Tiling
        </Link>

        <button className="menu-toggle" onClick={toggleMenu}>
          {/* Simple hamburger/close icon text. Can be replaced with SVG or icon font later */}
          {isOpen ? 'Close' : 'Menu'}
        </button>

        <ul className={isOpen ? 'nav-menu active' : 'nav-menu'}>
          <li><Link to="/" onClick={() => setIsOpen(false)}>Home</Link></li>
          <li><Link to="/services" onClick={() => setIsOpen(false)}>Services</Link></li>
          <li><Link to="/gallery" onClick={() => setIsOpen(false)}>Gallery</Link></li>
          <li><Link to="/about" onClick={() => setIsOpen(false)}>About</Link></li>
          <li><Link to="/contact" onClick={() => setIsOpen(false)}>Contact</Link></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
