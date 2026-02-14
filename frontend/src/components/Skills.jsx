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
import MaterialUI from '../assets/materialui.svg';
import NextJS from '../assets/nextjs.svg';
import ReactQuery from '../assets/reactquery.svg';

const skillData = [
    { name: 'REACT', img: ReactImg, percent: 92 },
    { name: 'NEXT JS', img: NextJS, percent: 70 },
    { name: 'REACT QUERY', img: ReactQuery, percent: 72 },
    { name: 'HTML', img: HTML, percent: 95 },
    { name: 'CSS', img: CSS, percent: 90 },
    { name: 'JAVASCRIPT', img: JavaScript, percent: 92 },
    { name: 'MATERIAL UI', img: MaterialUI, percent: 75 },
    { name: 'GITHUB', img: GitHub, percent: 85 },
    { name: 'NODE JS', img: Node, percent: 80 },
    { name: 'MONGO DB', img: Mongo, percent: 75 },
    { name: 'TAILWIND', img: Tailwind, percent: 85 },
    { name: 'FIREBASE', img: FireBase, percent: 70 },
];

const Skills = () => {
    const { isDark } = useTheme();
    return (
        <div name='skills' className={`w-full min-h-screen py-20 ${isDark ? 'bg-[#0a192f]' : 'bg-neutral-50'} ${isDark ? 'text-gray-300' : 'text-gray-700'} fade-in-up`}>
            {/* Container */}
            <div className='max-w-[1000px] mx-auto px-4 sm:px-6 md:px-8 flex flex-col justify-center w-full h-full'>
                <div className='fade-in-up'>
                    <p className={`text-2xl sm:text-3xl md:text-4xl font-bold inline border-b-4 border-rose-400 ${isDark ? 'text-[#ccd6f6]' : 'text-gray-900'}`}>Skills</p>
                    <p className={`py-4 text-sm sm:text-base ${isDark ? '' : 'text-gray-600'}`}>{/* These are the technologies I've worked with */}</p>
                </div>
                <div className='w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-6 text-center py-8 fade-in'>
                    {skillData.map((skill, idx) => (
                        <div key={skill.name} className={`enhanced-card flex flex-col items-center p-3 shadow-md ${isDark ? 'shadow-[#040c16]' : 'shadow-gray-300'} bg-opacity-90 rounded-lg`}>
                            <img className='w-20 mx-auto' src={skill.img} alt={skill.name} loading="lazy" />
                            <p className='my-2 font-semibold'>{skill.name}</p>
                            <div className='w-full mt-2'>
                                <div
                                  className={`h-2 rounded-full ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`}
                                  role="progressbar"
                                  aria-valuenow={skill.percent}
                                  aria-valuemin={0}
                                  aria-valuemax={100}
                                  aria-label={`${skill.name} proficiency: ${skill.percent}%`}
                                > 
                                    <div
                                        className={`h-2 rounded-full ${isDark ? 'bg-rose-400' : 'bg-rose-500'} transition-all duration-1000`}
                                        style={{ width: `${skill.percent}%`, transitionDelay: `${idx * 120}ms` }}
                                    ></div>
                                </div>
                                <span className='text-xs font-bold mt-1 inline-block'>{skill.percent}%</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Skills;
