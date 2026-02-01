import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import data from '../data/experiencedata.json';

const { experiences } = data;

const Experience = () => {
  const { isDark } = useTheme();
  const [expandedId, setExpandedId] = useState(null);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div name='experience' className={`w-full min-h-screen py-20 ${isDark ? 'bg-[#0a192f]' : 'bg-neutral-50'} ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
      <div className='max-w-[1000px] mx-auto px-4 sm:px-6 md:px-8 flex flex-col justify-center w-full h-full'>
        {/* Section Title */}
        <div className='pb-12 fade-in-up'>
          <p className={`text-2xl sm:text-3xl md:text-4xl font-bold inline border-b-4 border-rose-400 ${isDark ? 'text-[#ccd6f6]' : 'text-gray-900'}`}>
            Experience
          </p>
          <p className={`py-6 text-sm sm:text-base ${isDark ? '' : 'text-gray-600'}`}>{`// Check out my professional journey`}</p>
        </div>

        {/* Timeline */}
        <div className='space-y-6 md:space-y-8 animate-fadeIn'>
          {experiences.map((exp, index) => (
            <div
              key={exp.id}
              className={`relative pl-6 md:pl-8 border-l-4 animate-slideInLeft ${
                isDark ? 'border-rose-500' : 'border-rose-400'
              } transition-all duration-300 hover:pl-8 md:hover:pl-10 cursor-pointer`}
              style={{ animationDelay: `${index * 0.2}s` }}
              onClick={() => toggleExpand(exp.id)}
              role='article'
              aria-label={`Experience: ${exp.title}`}
            >
              {/* Timeline dot */}
              <div className={`absolute -left-3.5 md:-left-4 top-2 w-6 h-6 md:w-7 md:h-7 rounded-full transition-all duration-300 ${
                isDark ? 'bg-rose-500' : 'bg-rose-400'
              } border-4 ${isDark ? 'border-[#0a192f]' : 'border-neutral-50'} animate-pulse`}></div>

              {/* Experience Card */}
              <div className={`p-4 md:p-6 rounded-lg transition-all duration-300 transform hover:scale-105 ${
                isDark 
                  ? 'bg-gray-800 hover:bg-gray-700' 
                  : 'bg-white hover:shadow-md'
              } ${expandedId === exp.id ? (isDark ? 'bg-gray-700 shadow-xl' : 'shadow-lg') : ''}`}>
                
                {/* Header */}
                <div className='flex justify-between items-start gap-2'>
                  <div className='flex-1'>
                    <h3 className={`text-lg sm:text-xl font-bold ${isDark ? 'text-[#ccd6f6]' : 'text-gray-900'}`}>
                      {exp.title}
                    </h3>
                    <p className={`text-sm sm:text-base font-semibold mt-1 ${isDark ? 'text-rose-400' : 'text-rose-500'}`}>
                      {exp.company}
                    </p>
                    {exp.client && (
                      <p className={`text-xs sm:text-sm italic ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        {exp.client}
                      </p>
                    )}
                  </div>
                  <span className={`text-xs sm:text-sm font-semibold px-3 py-1 rounded-full whitespace-nowrap ${
                    isDark 
                      ? 'bg-gray-700 text-rose-400' 
                      : 'bg-rose-50 text-rose-700'
                  }`}>
                    {exp.duration}
                  </span>
                </div>

                {/* Description - Expandable */}
                <div className={`mt-4 overflow-hidden transition-all duration-300 ${
                  expandedId === exp.id ? 'max-h-96' : 'max-h-0'
                }`}>
                  <ul className='space-y-2 mt-4 text-sm sm:text-base'>
                    {exp.description.map((point, idx) => (
                      <li key={idx} className='flex items-start gap-3'>
                        <span className={`flex-shrink-0 w-2 h-2 mt-2 rounded-full ${isDark ? 'bg-rose-400' : 'bg-rose-500'}`}></span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Tech Used */}
                  <div className='mt-4 pt-4 border-t border-gray-700'>
                    <p className={`text-xs font-semibold mb-2 ${isDark ? 'text-rose-400' : 'text-rose-500'}`}>
                      TECH USED –
                    </p>
                    <div className='flex flex-wrap gap-2'>
                      {exp.techUsed.map((tech, idx) => (
                        <span
                          key={idx}
                          className={`text-xs sm:text-sm px-3 py-1 rounded-full transition-colors ${
                            isDark 
                              ? 'bg-gray-700 text-gray-300 hover:bg-rose-500 hover:text-white' 
                              : 'bg-gray-100 text-gray-700 hover:bg-rose-400 hover:text-white'
                          }`}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Expand indicator */}
                <div className='mt-3 flex items-center gap-2'>
                  <span className={`text-xs font-semibold ${isDark ? 'text-rose-400' : 'text-rose-500'}`}>
                    {expandedId === exp.id ? 'Show Less' : 'Show More'}
                  </span>
                  <svg 
                    className={`w-4 h-4 transition-transform duration-300 ${expandedId === exp.id ? 'rotate-180' : ''} ${isDark ? 'text-rose-400' : 'text-rose-500'}`}
                    fill='none' 
                    stroke='currentColor' 
                    viewBox='0 0 24 24'
                  >
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 14l-7 7m0 0l-7-7m7 7V3' />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Experience;
