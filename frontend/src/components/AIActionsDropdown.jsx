import React from 'react';
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/react';

const AIActionsDropdown = ({ item, setChatOpen, sendMessage }) => {
  const actions = [
    {
      label: 'Summary',
      message: item.name === 'SneakHub - E-Commerce Platform'
        ? `1. Project summary: SneakHub is a comprehensive, full-stack e-commerce platform for sneaker enthusiasts, delivering a seamless shopping experience with advanced AI features and robust security.\n2. Tools & Tech: Next.js, React.js, Tailwind CSS, Razorpay API, Node.js.`
        : `Explain the project "${item.name}" in 1-2 lines, then list the main tools and technologies used. Do not mention company or experience unless asked. Format the answer as: \n1. Project summary (1-2 lines)\n2. Tools & Tech: ...`,
    },
    {
      label: 'Challenges',
      message: item.name === 'SneakHub - E-Commerce Platform'
        ? `Key challenges included integrating secure Razorpay payments, building a scalable product catalog, and implementing AI-powered recommendations and visual search. These were solved with robust API design, efficient database management, and leveraging external AI/ML services.`
        : `What were the main technical challenges in the project "${item.name}"? List 1-2 key challenges and how they were solved. Be concise.`,
    },
    {
      label: 'Architecture',
      message: item.name === 'SneakHub - E-Commerce Platform'
        ? `SneakHub features a Next.js and React.js frontend for SSR and SEO, a Node.js backend with RESTful APIs, Razorpay for secure payments, and Tailwind CSS for UI. AI/ML modules provide recommendations, visual search, and sentiment analysis, all deployed on scalable cloud infrastructure.`
        : `Describe the technical architecture of the project "${item.name}". Mention the stack, main components, and any unique implementation details. Be concise.`,
    },
    {
      label: 'Generate Pitch',
      message: item.name === 'SneakHub - E-Commerce Platform'
        ? `SneakHub is a next-generation e-commerce platform for sneaker lovers, blending a modern tech stack with AI-driven personalization, visual search, and secure payments. Its rich features and intelligent design make it a flagship project for innovation and user experience.`
        : `Generate a professional pitch for the project "${item.name}". The pitch should be concise, persuasive, and suitable for recruiters or clients. Highlight the impact, innovation, and value of the project in 2-3 sentences.`,
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