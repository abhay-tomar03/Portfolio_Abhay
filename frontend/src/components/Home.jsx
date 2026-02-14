import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Link } from 'react-scroll';
import { HiArrowNarrowRight } from 'react-icons/hi';

const roles = [
  'Frontend Software Engineer',
  'React.js Developer',
  'UI/UX Enthusiast',
  'Problem Solver',
];

const Home = () => {
  const { isDark } = useTheme();
  const [roleIndex, setRoleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    const currentRole = roles[roleIndex];
    let timeout;

    if (!isDeleting && charIndex < currentRole.length) {
      timeout = setTimeout(() => {
        setDisplayText(currentRole.substring(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      }, 80);
    } else if (!isDeleting && charIndex === currentRole.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && charIndex > 0) {
      timeout = setTimeout(() => {
        setDisplayText(currentRole.substring(0, charIndex - 1));
        setCharIndex(charIndex - 1);
      }, 40);
    } else if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, roleIndex]);

  return (
    <div name='home' className={`w-full min-h-screen py-20 ${isDark ? 'bg-[#0a192f]' : 'bg-neutral-50'} fade-in-up`}> 
      {/* Container */}
      <div className='max-w-[1000px] mx-auto px-4 sm:px-6 md:px-8 flex flex-col justify-center min-h-screen'>
        <p className='fade-in text-sm sm:text-base md:text-lg text-rose-500 font-semibold'>Hi, my name is</p>
        <h1 className={`fade-in-up text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold ${isDark ? 'text-[#ccd6f6]' : 'text-gray-900'}`}>
          ABHAY TOMAR
        </h1>
        <h2 className={`fade-in-up text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
          {displayText}
          <span className="animate-pulse text-rose-500">|</span>
        </h2>
        <p className={`fade-in-up py-4 max-w-[700px] text-sm sm:text-base md:text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
          Frontend Software Engineer at Tata Consultancy Services with hands-on experience in building user interfaces for enterprise internal applications using React.js, Material UI, and React Query.
        </p>
        <div className='fade-in-up flex gap-4 mt-2'>
          <Link to='work' smooth={true} duration={500} offset={-80}>
            <button className='group enhanced-btn border-2 border-rose-500 text-rose-500 hover:bg-rose-500 hover:text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition-all duration-300'>
              View My Work
              <HiArrowNarrowRight className='group-hover:translate-x-2 transition-transform duration-300' />
            </button>
          </Link>
          <Link to='contact' smooth={true} duration={500} offset={-80}>
            <button className='enhanced-btn bg-rose-500 text-white hover:bg-rose-600 px-6 py-3 rounded-lg font-semibold transition-all duration-300'>
              Contact Me
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
