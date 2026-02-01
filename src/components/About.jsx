import React from 'react';
import { useTheme } from '../context/ThemeContext';

const About = () => {
  const { isDark } = useTheme();
  return (
    <div name='about' className={`w-full min-h-screen py-20 ${isDark ? 'bg-[#0a192f]' : 'bg-neutral-50'} ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
      <div className='flex flex-col justify-center items-center w-full h-full'>
        <div className='max-w-[1000px] w-full grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 px-4 sm:px-6 md:px-8'>
          <div className='text-center md:text-right pb-8 slide-in-left'>
            <p className={`text-2xl sm:text-3xl md:text-4xl font-bold inline border-b-4 border-rose-400 ${isDark ? 'text-[#ccd6f6]' : 'text-gray-900'}`}>
              About
            </p>
          </div>
          <div></div>
        </div>
        <div className='max-w-[1000px] w-full grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 px-4 sm:px-6 md:px-8'>
          <div className={`text-center md:text-right text-2xl sm:text-3xl md:text-4xl font-bold fade-in-up ${isDark ? 'text-gray-300' : 'text-gray-900'}`}>
            <p>Frontend Engineer</p>
            <p className='text-lg sm:text-2xl md:text-3xl text-rose-500 font-semibold mt-2'>ReactJs Developer</p>
          </div>
          <div className={`fade-in-up text-sm sm:text-base space-y-3 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            <p>
              Currently working as a Frontend Engineer at TCS for an automotive client (Stellantis), developing reusable UI components with React.js, Material UI, and React Query. Experienced in REST API integration and Agile development environments.
            </p>
            <p>
              Skilled in React.js, JavaScript, TypeScript, and modern frontend tools. Passionate about writing clean, maintainable code and continuously improving my skills in the React ecosystem.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
