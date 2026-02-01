import React from 'react';
import { useTheme } from '../context/ThemeContext';

import HTML from '../assets/html.png';
import CSS from '../assets/css.png';
import JavaScript from '../assets/javascript.png';
import ReactImg from '../assets/react.png';
import Node from '../assets/node.png';
import FireBase from '../assets/firebase.png';
import GitHub from '../assets/github.png';
import Tailwind from '../assets/tailwind.png';
import Mongo from '../assets/mongo.png';

const Skills = () => {
  const { isDark } = useTheme();
  return (
    <div name='skills' className={`w-full min-h-screen py-20 ${isDark ? 'bg-[#0a192f]' : 'bg-neutral-50'} ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
      {/* Container */}
      <div className='max-w-[1000px] mx-auto px-4 sm:px-6 md:px-8 flex flex-col justify-center w-full h-full'>
          <div className='fade-in-up'>
              <p className={`text-2xl sm:text-3xl md:text-4xl font-bold inline border-b-4 border-rose-400 ${isDark ? 'text-[#ccd6f6]' : 'text-gray-900'}`}>Skills</p>
              <p className={`py-4 text-sm sm:text-base ${isDark ? '' : 'text-gray-600'}`}>// These are the technologies I've worked with</p>
          </div>

          <div className='w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-6 text-center py-8 fade-in'>
              <div className='shadow-md shadow-[#040c16] hover:scale-110 duration-500' role='img' aria-label='HTML skill'>
                  <img className='w-20 mx-auto' src={HTML} alt="HTML" />
                  <p className='my-4'>HTML</p>
              </div>
              <div className='shadow-md shadow-[#040c16] hover:scale-110 duration-500' role='img' aria-label='CSS skill'>
                  <img className='w-20 mx-auto' src={CSS} alt="CSS" />
                  <p className='my-4'>CSS</p>
              </div>
              <div className='shadow-md shadow-[#040c16] hover:scale-110 duration-500' role='img' aria-label='JavaScript skill'>
                  <img className='w-20 mx-auto' src={JavaScript} alt="JavaScript" />
                  <p className='my-4'>JAVASCRIPT</p>
              </div>
              <div className='shadow-md shadow-[#040c16] hover:scale-110 duration-500' role='img' aria-label='React skill'>
                  <img className='w-20 mx-auto' src={ReactImg} alt="React" />
                  <p className='my-4'>REACT</p>
              </div>
              <div className='shadow-md shadow-[#040c16] hover:scale-110 duration-500' role='img' aria-label='GitHub skill'>
                  <img className='w-20 mx-auto' src={GitHub} alt="GitHub" />
                  <p className='my-4'>GITHUB</p>
              </div>
              <div className='shadow-md shadow-[#040c16] hover:scale-110 duration-500' role='img' aria-label='Node.js skill'>
                  <img className='w-20 mx-auto' src={Node} alt="Node.js" />
                  <p className='my-4'>NODE JS</p>
              </div>
              <div className='shadow-md shadow-[#040c16] hover:scale-110 duration-500' role='img' aria-label='MongoDB skill'>
                  <img className='w-20 mx-auto' src={Mongo} alt="MongoDB" />
                  <p className='my-4'>MONGO DB</p>
              </div>
              <div className='shadow-md shadow-[#040c16] hover:scale-110 duration-500' role='img' aria-label='Tailwind CSS skill'>
                  <img className='w-20 mx-auto' src={Tailwind} alt="Tailwind CSS" />
                  <p className='my-4'>TAILWIND</p>
              </div>
              <div className='shadow-md shadow-[#040c16] hover:scale-110 duration-500' role='img' aria-label='Firebase skill'>
                  <img className='w-20 mx-auto' src={FireBase} alt="Firebase" />
                  <p className='my-4'>FIREBASE</p>
              </div>
          </div>
      </div>
    </div>
  );
};

export default Skills;
