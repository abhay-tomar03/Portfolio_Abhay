import React from 'react';
import ReactDOM from 'react-dom';

const ProjectAIActions = ({ item, setChatOpen, sendMessage }) => (
  ReactDOM.createPortal(
    <div className="absolute left-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity z-[9999]">
      <button
        className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 text-gray-800"
        onClick={() => {
          setChatOpen(true);
          sendMessage(`Explain the project \"${item.name}\" in 1-2 lines, then list the main tools and technologies used. Do not mention company or experience unless asked. Format the answer as: \n1. Project summary (1-2 lines)\n2. Tools & Tech: ...`);
        }}
      >
        Summary
      </button>
      <button
        className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 text-gray-800"
        onClick={() => {
          setChatOpen(true);
          sendMessage(`What were the main technical challenges in the project \"${item.name}\"? List 1-2 key challenges and how they were solved. Be concise.`);
        }}
      >
        Challenges
      </button>
      <button
        className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 text-gray-800"
        onClick={() => {
          setChatOpen(true);
          sendMessage(`Describe the technical architecture of the project \"${item.name}\". Mention the stack, main components, and any unique implementation details. Be concise.`);
        }}
      >
        Architecture
      </button>
      <button
        className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 text-gray-800"
        onClick={() => {
          setChatOpen(true);
          sendMessage(`Generate a professional pitch for the project \"${item.name}\". The pitch should be concise, persuasive, and suitable for recruiters or clients. Highlight the impact, innovation, and value of the project in 2-3 sentences.`);
        }}
      >
        Generate Pitch
      </button>
    </div>,
    document.body
  )
);

export default ProjectAIActions;
