import React, { useState, useEffect } from 'react';
import { Sun, Moon, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav className="navbar glass">
        <div className="container nav-content">
          <a href="#" className="logo">Pavan<span>.</span></a>
          <div className="nav-links">
            <a href="#about">About</a>
            <a href="#experience">Experience</a>
            <a href="#education">Education</a>
            <a href="#projects">Work</a>
            <a href="#skills">Skills</a>
            <a href="#contact">Contact</a>
            <button 
              id="theme-toggle" 
              className="icon-btn" 
              aria-label="Toggle Theme"
              onClick={toggleTheme}
            >
              {theme === 'dark' ? <Sun className="sun-icon" size={20} /> : <Moon className="moon-icon" size={20} />}
            </button>
          </div>
          <button 
            className="mobile-menu-btn icon-btn" 
            aria-label="Menu"
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      <div className={`mobile-nav glass ${isMobileMenuOpen ? 'active' : ''}`}>
        {['about', 'experience', 'education', 'projects', 'skills', 'contact'].map(link => (
          <a 
            key={link} 
            href={`#${link}`} 
            className="mobile-link"
            onClick={closeMobileMenu}
          >
            {link.charAt(0).toUpperCase() + link.slice(1)}
          </a>
        ))}
      </div>
    </>
  );
};

export default Navbar;
