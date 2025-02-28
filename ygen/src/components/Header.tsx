import React, { useState, useEffect } from 'react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`${scrolled ? 'py-4 bg-black/95' : 'py-6 bg-black/80'} backdrop-blur-sm text-white px-4 sticky top-0 z-50 border-b border-gray-800/50 shadow-lg transition-all duration-300`}>
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-purple-400 to-blue-500 hover:scale-105 transition-transform duration-300 cursor-pointer">
            YGen
          </h1>
        </div>
        <nav className="hidden md:flex space-x-8">
          <a href="#hero" className="relative py-2 hover:text-purple-400 transition-colors duration-300 group">
            About
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
          </a>
          <a href="#micro-groups" className="relative py-2 hover:text-purple-400 transition-colors duration-300 group">
            Micro Groups
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
          </a>
          <a href="#event" className="relative py-2 hover:text-purple-400 transition-colors duration-300 group">
            Events
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
          </a>
          <a href="#contact" className="relative py-2 hover:text-purple-400 transition-colors duration-300 group">
            Contact
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
          </a>
        </nav>
        <div className="md:hidden">
          <button 
            className="text-white focus:outline-none hover:text-purple-400 transition-colors duration-300"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {!isMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-gray-900/95 backdrop-blur-md border-b border-gray-800 shadow-xl animate-fadeIn">
          <div className="container mx-auto py-4 px-4">
            <nav className="flex flex-col space-y-4">
              <a 
                href="#hero" 
                className="py-2 px-4 hover:bg-gray-800 rounded-lg transition-colors duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </a>
              <a 
                href="#micro-groups" 
                className="py-2 px-4 hover:bg-gray-800 rounded-lg transition-colors duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Micro Groups
              </a>
              <a 
                href="#event" 
                className="py-2 px-4 hover:bg-gray-800 rounded-lg transition-colors duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Events
              </a>
              <a 
                href="#contact" 
                className="py-2 px-4 hover:bg-gray-800 rounded-lg transition-colors duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </a>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;