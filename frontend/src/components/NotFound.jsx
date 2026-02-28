import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { Link } from 'react-scroll';
import { HiArrowNarrowRight } from 'react-icons/hi';

const NotFound = () => {
  const { isDark } = useTheme();

  return (
    <div className={`w-full min-h-screen flex items-center justify-center ${isDark ? 'bg-[#0a192f]' : 'bg-neutral-50'} ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
      <div className='max-w-[600px] mx-auto px-4 sm:px-6 md:px-8 text-center fade-in-up'>
        <div className='mb-8'>
          <h1 className={`text-6xl sm:text-7xl md:text-8xl font-bold mb-4 ${isDark ? 'text-rose-500' : 'text-rose-400'}`}>
            404
          </h1>
          <p className={`text-2xl sm:text-3xl md:text-4xl font-bold mb-4 ${isDark ? 'text-[#ccd6f6]' : 'text-gray-900'}`}>
            Page Not Found
          </p>
          <p className={`text-base sm:text-lg mb-8 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Sorry, the page you're looking for doesn't exist. But don't worry, you can explore my portfolio instead!
          </p>
        </div>

        <div className='flex flex-col sm:flex-row gap-4 justify-center'>
          <Link to='home' smooth={true} duration={500}>
            <button className='group enhanced-btn border-2 border-rose-500 text-rose-500 hover:bg-rose-500 hover:text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition-all duration-300 justify-center'>
              Back to Home
              <HiArrowNarrowRight className='group-hover:translate-x-2 transition-transform duration-300' />
            </button>
          </Link>
          <Link to='work' smooth={true} duration={500} offset={-80}>
            <button className='enhanced-btn bg-rose-500 text-white hover:bg-rose-600 px-6 py-3 rounded-lg font-semibold transition-all duration-300'>
              View My Work
            </button>
          </Link>
        </div>

        <div className={`mt-12 p-6 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}>
          <p className='text-sm opacity-75 mb-4'>Quick Navigation:</p>
          <div className='flex flex-wrap gap-3 justify-center'>
            {['Home', 'About', 'Skills', 'Experience', 'Work', 'Contact'].map((item) => (
              <Link 
                key={item}
                to={item.toLowerCase()} 
                smooth={true} 
                duration={500}
                offset={-80}
                className={`px-3 py-1 rounded text-sm font-semibold cursor-pointer transition ${isDark ? 'hover:text-rose-400' : 'hover:text-rose-500'}`}
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
