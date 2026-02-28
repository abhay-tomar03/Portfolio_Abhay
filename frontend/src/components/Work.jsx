import React, { useState, useEffect, useCallback } from 'react';
import { useTheme } from '../context/ThemeContext';
import { data, categories } from "../data/data.js";
import AIActionsDropdown from "./AIActionsDropdown.jsx";

const Work = ({ sendMessage, setChatOpen }) => {
  const { isDark } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIdx, setLightboxIdx] = useState(0);

  // Lightbox keyboard handling (Escape to close, arrow keys to navigate)
  const handleLightboxKey = useCallback((e) => {
    if (!lightboxOpen) return;
    if (e.key === 'Escape') setLightboxOpen(false);
    if (e.key === 'ArrowLeft') setLightboxIdx(idx => (idx > 0 ? idx - 1 : data.length - 1));
    if (e.key === 'ArrowRight') setLightboxIdx(idx => (idx < data.length - 1 ? idx + 1 : 0));
  }, [lightboxOpen]);

  useEffect(() => {
    if (lightboxOpen) {
      document.addEventListener('keydown', handleLightboxKey);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.removeEventListener('keydown', handleLightboxKey);
      document.body.style.overflow = '';
    };
  }, [lightboxOpen, handleLightboxKey]);
  const project = data;
  const filteredProjects = selectedCategory === "All" 
    ? project 
    : project.filter(item => item.category === selectedCategory);
  
  // Apply search filter on top of category filter
  const searchedProjects = filteredProjects.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div name='work' className={`w-full min-h-screen py-20 ${isDark ? 'text-gray-300' : 'text-gray-700'} ${isDark ? 'bg-[#0a192f]' : 'bg-neutral-50'} fade-in-up`}> 
      <div className='max-w-[1000px] mx-auto px-4 sm:px-6 md:px-8 flex flex-col justify-center w-full h-full'>
        <div className='pb-8 fade-in-up'>
          <p className={`text-2xl sm:text-3xl md:text-4xl font-bold inline border-b-4 ${isDark ? 'text-[#ccd6f6]' : 'text-gray-900'} border-rose-400`}>
            Work
          </p>
          <p className={`py-6 text-sm sm:text-base ${isDark ? '' : 'text-gray-600'}`}>{/* Check out some of my recent work */}</p>
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
        {/* Search Input */}
        <div className='mb-8 fade-in-up'>
          <input
            type='text'
            placeholder='Search projects by name or description...'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full px-4 py-3 rounded-lg border-2 transition focus:outline-none ${
              isDark
                ? 'bg-gray-700 border-gray-600 text-gray-300 placeholder-gray-400 focus:border-rose-500 focus:ring-2 focus:ring-rose-500 focus:ring-opacity-20'
                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-rose-500 focus:ring-2 focus:ring-rose-500 focus:ring-opacity-20'
            }`}
            aria-label='Search projects'
          />
        </div>
        {/* container for projects */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 fade-in">
          {searchedProjects.length > 0 ? (
            <>
              {searchedProjects.map((item, index) => (
                <div
                  key={index}
                  style={{ backgroundImage: `url(${item.image})`, cursor: 'pointer' }}
                  className="enhanced-card group container rounded-md flex justify-center text-center items-center mx-auto content-div overflow-visible relative"
                  role="article"
                  aria-label={`Project: ${item.name}`}
                  onClick={e => {
                    // Only open lightbox if clicking on the image background, not on a button
                    if (e.target === e.currentTarget) {
                      setLightboxOpen(true);
                      setLightboxIdx(data.indexOf(item));
                    }
                  }}
                >
                  {/* Featured Badge */}
                  {item.featured && (
                    <div className='absolute top-2 right-2 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-xs font-bold shadow-lg flex items-center gap-1 z-10 animate-pulse'>
                      ⭐ Featured
                    </div>
                  )}
                  {/* Hover effect for images — always visible on touch/mobile */}
                  <div className="sm:opacity-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span
                      className="block px-2 py-1 bg-black bg-opacity-60 rounded-md mb-2 mx-auto max-w-[90%] text-lg sm:text-xl md:text-2xl font-extrabold text-white tracking-tight shadow-lg backdrop-blur-sm"
                      style={{
                        textShadow: '0 2px 8px rgba(0,0,0,0.7), 0 1px 0 #fff',
                        letterSpacing: '0.01em',
                        lineHeight: 1.2,
                        wordBreak: 'break-word',
                      }}
                    >
                      {item.name}
                    </span>
                    {/* Tech Stack Preview */}
                    {item.techStack && (
                      <div className="px-2 py-1 mb-2 mx-auto text-center">
                        <p className="text-xs font-semibold text-gray-300 mb-1">Tech Stack:</p>
                        <div className="flex flex-wrap justify-center gap-1">
                          {item.techStack.map((tech, idx) => (
                            <span key={idx} className="text-xs bg-rose-500 text-white px-2 py-0.5 rounded-full">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    <div className="pt-4 text-center ">
                      <div className="flex flex-row flex-wrap justify-center gap-2 mt-2">
                        <a href={item.github} target="_blank" rel="noopener noreferrer" aria-label={`View code for ${item.name}`}> 
                          <button
                            className="enhanced-btn rounded-lg px-4 py-2 font-bold text-base bg-white text-gray-700 hover:bg-pink-600 hover:text-white border border-gray-200 shadow-sm"
                          >
                            Code
                          </button>
                        </a>
                        {item.live && (
                          <a href={item.live} target="_blank" rel="noopener noreferrer" aria-label={`View live demo for ${item.name}`}> 
                            <button
                              className="enhanced-btn rounded-lg px-4 py-2 font-bold text-base bg-white text-gray-700 hover:bg-pink-600 hover:text-white border border-gray-200 shadow-sm"
                            >
                              Live
                            </button>
                          </a>
                        )}
                        <div className="relative group">
                          {/* AI Actions Dropdown */}
                          <AIActionsDropdown item={item} setChatOpen={setChatOpen} sendMessage={sendMessage} />
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              ))}
              {/* Lightbox Modal */}
              {lightboxOpen && (
                <div
                  className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-80 transition-all animate-fadein"
                  onClick={() => setLightboxOpen(false)}
                  role="dialog"
                  aria-modal="true"
                  aria-label="Image preview"
                >
                  <div
                    className="relative max-w-2xl w-full flex flex-col items-center"
                    onClick={e => e.stopPropagation()}
                  >
                    <button
                      className="absolute top-2 right-2 text-white text-2xl bg-black bg-opacity-40 rounded-full px-2 py-1 hover:bg-opacity-70 transition"
                      onClick={() => setLightboxOpen(false)}
                      aria-label="Close preview"
                    >
                      ×
                    </button>
                    <img
                      src={data[lightboxIdx]?.image}
                      alt={data[lightboxIdx]?.name}
                      className="rounded-lg max-h-[70vh] w-auto object-contain shadow-2xl transition-transform duration-300 hover:scale-105"
                      style={{ background: '#fff' }}
                      loading="lazy"
                    />
                    <div className="flex justify-between w-full mt-4">
                      <button
                        className="px-4 py-2 text-white bg-rose-500 rounded hover:bg-rose-600 disabled:opacity-40"
                        onClick={() => setLightboxIdx(idx => (idx > 0 ? idx - 1 : data.length - 1))}
                        disabled={data.length <= 1}
                        aria-label="Previous image"
                      >
                        ◀
                      </button>
                      <span className="text-white text-sm font-semibold">{data[lightboxIdx].name}</span>
                      <button
                        className="px-4 py-2 text-white bg-rose-500 rounded hover:bg-rose-600 disabled:opacity-40"
                        onClick={() => setLightboxIdx(idx => (idx < data.length - 1 ? idx + 1 : 0))}
                        disabled={data.length <= 1}
                        aria-label="Next image"
                      >
                        ▶
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className={`col-span-full text-center py-8 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              <p>No projects found matching "{searchQuery}" {selectedCategory !== "All" && `in ${selectedCategory}`}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Work;
