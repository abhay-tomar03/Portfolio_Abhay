import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { data, categories } from "../data/data.js";


const Work = ({ sendMessage, setChatOpen }) => {
  const { isDark } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [explainingId, setExplainingId] = useState(null);
  const [explanations, setExplanations] = useState({});
  const [explainError, setExplainError] = useState("");
  const [loadingExplain, setLoadingExplain] = useState(false);

  
    // projects file
    const project = data;
    const filteredProjects = selectedCategory === "All" 
      ? project 
      : project.filter(item => item.category === selectedCategory);
  
  return (
    <div name='work' className={`w-full min-h-screen py-20 ${isDark ? 'text-gray-300' : 'text-gray-700'} ${isDark ? 'bg-[#0a192f]' : 'bg-neutral-50'}`}>
      <div className='max-w-[1000px] mx-auto px-4 sm:px-6 md:px-8 flex flex-col justify-center w-full h-full'>
        <div className='pb-8 fade-in-up'>
          <p className={`text-2xl sm:text-3xl md:text-4xl font-bold inline border-b-4 ${isDark ? 'text-[#ccd6f6]' : 'text-gray-900'} border-rose-400`}>
            Work
          </p>
          <p className={`py-6 text-sm sm:text-base ${isDark ? '' : 'text-gray-600'}`}>// Check out some of my recent work</p>
        </div>

        {/* Filter Buttons */}
        <div className='flex flex-wrap gap-2 sm:gap-3 md:gap-4 pb-8 fade-in-up'>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 sm:px-4 md:px-6 py-2 text-sm sm:text-base rounded-lg font-semibold transition-all duration-300 ${
                selectedCategory === cat
                  ? 'bg-rose-500 text-white scale-105'
                  : isDark
                  ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
              aria-pressed={selectedCategory === cat}
              aria-label={`Filter by ${cat}`}
            >
              {cat}
            </button>
          ))}
        </div>

{/* container for projects */}
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 fade-in">
  {filteredProjects.length > 0 ? (
    filteredProjects.map((item, index) => (
      <div
        key={index}
        style={{ backgroundImage: `url(${item.image})` }}
        className="shadow-lg shadow-[#040c16] group container rounded-md flex justify-center text-center items-center mx-auto content-div "
        role="article"
        aria-label={`Project: ${item.name}`}
      >
        {/* Hover effect for images */}
        <div className="opacity-0 group-hover:opacity-100 ">
          <span className="text-2xl font bold text-white tracking-wider ">{item.name}</span>
          <div className="pt-8 text-center ">
            <div className="flex flex-row flex-wrap justify-center gap-2 mt-2">
              <a href={item.github} target="_blank" rel="noopener noreferrer" aria-label={`View code for ${item.name}`}>
                <button
                  className="rounded-lg px-4 py-2 font-bold text-base transition bg-white text-gray-700 hover:bg-pink-600 hover:text-white border border-gray-200 shadow-sm"
                >
                  Code
                </button>
              </a>
              {item.live && (
                <a href={item.live} target="_blank" rel="noopener noreferrer" aria-label={`View live demo for ${item.name}`}>
                  <button
                    className="rounded-lg px-4 py-2 font-bold text-base transition bg-white text-gray-700 hover:bg-pink-600 hover:text-white border border-gray-200 shadow-sm"
                  >
                    Live
                  </button>
                </a>
              )}
              <button
                className="rounded-lg px-4 py-2 font-bold text-base transition bg-rose-500 text-white hover:bg-rose-600 border border-rose-500 shadow-sm"
                onClick={() => {
                  setChatOpen(true);
                  sendMessage(`Explain the project "${item.name}" in 1-2 lines, then list the main tools and technologies used. Do not mention company or experience unless asked. Format the answer as: \n1. Project summary (1-2 lines)\n2. Tools & Tech: ...`);
                }}
                aria-label={`Explain ${item.name}`}
              >
                Explain with AI
              </button>
            </div>
          </div>
          {/* AI Explanation */}
          {explainingId === item.id && loadingExplain && (
            <div className="mt-4 p-3 rounded bg-gray-900 bg-opacity-80 text-gray-100 text-left text-sm border border-rose-400 shadow-lg">
              <strong>AI Explanation:</strong>
              <div>Loading...</div>
            </div>
          )}
          {explanations[item.id] && !loadingExplain && (
            <div className="mt-4 p-3 rounded bg-gray-900 bg-opacity-80 text-gray-100 text-left text-sm border border-rose-400 shadow-lg">
              <strong>AI Explanation:</strong>
              <div>{explanations[item.id]}</div>
            </div>
          )}
          {/* Error */}
          {explainError && explainingId === item.id && (
            <div className="mt-2 text-red-400 text-xs">{explainError}</div>
          )}
        </div>
      </div>
    ))
  ) : (
    <div className={`col-span-full text-center py-8 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
      <p>No projects found in this category</p>
    </div>
  )}
</div>
      </div>
    </div>
  );
};

export default Work;
