import React from 'react';
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/react';

const AIActionsDropdown = ({ item, setChatOpen, sendMessage }) => {
  const actions = [
    {
      label: 'Summary',
      message: `Explain the project "${item.name}" in 1-2 lines, then list the main tools and technologies used. Do not mention company or experience unless asked. Format the answer as: \n1. Project summary (1-2 lines)\n2. Tools & Tech: ...`,
    },
    {
      label: 'Challenges',
      message: `What were the main technical challenges in the project "${item.name}"? List 1-2 key challenges and how they were solved. Be concise.`,
    },
    {
      label: 'Architecture',
      message: `Describe the technical architecture of the project "${item.name}". Mention the stack, main components, and any unique implementation details. Be concise.`,
    },
    {
      label: 'Generate Pitch',
      message: `Generate a professional pitch for the project "${item.name}". The pitch should be concise, persuasive, and suitable for recruiters or clients. Highlight the impact, innovation, and value of the project in 2-3 sentences.`,
    },
  ];

  return (
    <Menu as="div" className="relative inline-block text-left">
      <MenuButton className="enhanced-btn rounded-lg px-4 py-2 font-bold text-base bg-rose-500 text-white hover:bg-rose-600 border border-rose-500 shadow-sm">
        AI Actions ▼
      </MenuButton>
      <MenuItems
        anchor="bottom start"
        className="z-[9999] w-48 rounded-md bg-white border border-gray-200 shadow-lg focus:outline-none"
      >
        {actions.map((action) => (
          <MenuItem key={action.label}>
            {({ active }) => (
              <button
                className={`block w-full text-left px-4 py-2 text-sm text-gray-800 ${
                  active ? 'bg-gray-100' : ''
                }`}
                onClick={() => {
                  setTimeout(() => {
                    setChatOpen(true);
                    sendMessage(action.message);
                  }, 150);
                }}
              >
                {action.label}
              </button>
            )}
          </MenuItem>
        ))}
      </MenuItems>
    </Menu>
  );
};

export default AIActionsDropdown;