import React, { useState, useEffect } from 'react';
import { FaArrowUp } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { isDark } = useTheme();

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <div className='fixed bottom-8 right-8 z-50'>
      <button
        onClick={scrollToTop}
        className={`backtotop-animate ${isVisible ? 'visible' : ''} p-3 rounded-full shadow-lg hover:scale-110 transition-transform duration-300 ${
          isDark 
            ? 'bg-pink-600 hover:bg-pink-700 text-white' 
            : 'bg-pink-500 hover:bg-pink-600 text-white'
        }`}
        aria-label="Scroll to top"
        style={{ transitionDelay: isVisible ? '0s' : '0s' }}
      >
        <FaArrowUp size={20} />
      </button>
    </div>
  );
};

export default BackToTop;
