import React from 'react';
import { useTheme } from '../context/ThemeContext';
// import { HiArrowNarrowRight } from 'react-icons/hi';

const Home = () => {
  const { isDark } = useTheme();

  return (
    <div name='home' className={`w-full min-h-screen py-20 ${isDark ? 'bg-[#0a192f]' : 'bg-neutral-50'}`}>
      {/* Container */}
      <div className='max-w-[1000px] mx-auto px-4 sm:px-6 md:px-8 flex flex-col justify-center min-h-screen'>
        <p className='fade-in text-sm sm:text-base md:text-lg text-rose-500 font-semibold'>Hi, my name is</p>
        <h1 className={`fade-in-up text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold ${isDark ? 'text-[#ccd6f6]' : 'text-gray-900'}`}>
          ABHAY TOMAR
        </h1>
        <h2 className={`fade-in-up text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
          Frontend Software Engineer
        </h2>
        <p className={`fade-in-up py-4 max-w-[700px] text-sm sm:text-base md:text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
          Frontend Software Engineer at Tata Consultancy Services with hands-on experience in building user interfaces for enterprise internal applications using React.js, Material UI, and React Query.
        </p>
      </div>
    </div>
  );
};

export default Home;
