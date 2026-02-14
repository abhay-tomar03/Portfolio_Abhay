import React, { useEffect } from 'react';

const Notification = ({ message, type = 'info', onClose }) => {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [message, onClose]);

  if (!message) return null;

  let bgColor = 'bg-blue-100 text-blue-900';
  if (type === 'success') bgColor = 'bg-green-100 text-green-900 border border-green-300';
  else if (type === 'error') bgColor = 'bg-red-100 text-red-900 border border-red-300';

  return (
    <div
      className={`fixed top-20 right-8 z-[9999] px-5 py-3 rounded shadow-lg font-semibold text-sm transition-all ${bgColor}`}
      style={{ minWidth: '220px', maxWidth: '320px', textAlign: 'left' }}
    >
      {message}
    </div>
  );
};

export default Notification;
