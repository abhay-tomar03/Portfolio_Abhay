import React, { useState, useRef, useEffect } from 'react';
import { FaUserCircle, FaRobot } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';
import ReactMarkdown from 'react-markdown';

const getRelativeTime = (timestamp) => {
  if (!timestamp) return '';
  const now = new Date();
  const date = new Date(timestamp);
  const diff = Math.floor((now - date) / 1000);
  if (diff < 10) return 'just now';
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
};

const AIChat = ({ isOpen, setIsOpen, messages, sendMessage, loading, streaming, error, inputDisabled, clearChat, unreadCount }) => {
  const { isDark } = useTheme();
  const [input, setInput] = useState('');
  const [copiedId, setCopiedId] = useState(null);
  const [showTypedWelcome, setShowTypedWelcome] = useState(true);
  const [typedText, setTypedText] = useState('');
  const welcomeText = "Hi! 👋 I'm Abhay's AI assistant. Ask me anything about his projects, skills, or experience!";

  // Typing effect for the initial message
  useEffect(() => {
    if (!showTypedWelcome) return;
    let i = 0;
    setTypedText('');
    const interval = setInterval(() => {
      setTypedText(welcomeText.slice(0, i + 1));
      i++;
      if (i === welcomeText.length) {
        clearInterval(interval);
        setTimeout(() => setShowTypedWelcome(false), 500);
      }
    }, 18);
    return () => clearInterval(interval);
    // eslint-disable-next-line
  }, [showTypedWelcome]);
  // const [minimized, setMinimized] = useState(false);
  const messagesEndRef = useRef(null);
  const quickActions = [
    { label: '🚀 Best Project', question: 'What is my best project and why?' },
    { label: '💪 Core Skills', question: 'What are my strongest skills?' },
    { label: '🏯 Why Hire Me', question: 'Why should you hire Abhay?' },
    { label: '📋 Experience', question: 'Tell me about the current role' }
  ];
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  const handleSend = () => {
    if (!input.trim()) return;
    sendMessage(input);
    setInput('');
  };
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 640);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  const chatPanelClass = isMobile
    ? `fixed inset-0 z-50 w-full h-full rounded-none shadow-2xl flex flex-col overflow-hidden transition-all duration-300 ${isDark ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-900'}`
    : `fixed bottom-6 right-24 z-50 w-96 max-h-[600px] rounded-lg shadow-2xl flex flex-col overflow-hidden transition-all duration-300 ${isDark ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-900'} md:w-96 sm:w-full sm:right-0 sm:left-auto sm:bottom-4 sm:rounded-lg sm:max-h-[90vh]'}`;
  useEffect(() => {
    if (!isMobile || !isOpen) return;
    let startY = null;
    const handleTouchStart = (e) => { startY = e.touches[0].clientY; };
    const handleTouchMove = (e) => {
      if (startY !== null && e.touches[0].clientY - startY > 80) {
        setIsOpen(false);
        startY = null;
      }
    };
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchmove', handleTouchMove);
    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [isMobile, isOpen, setIsOpen]);

  return (
    <>
      {/* Chat Widget Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className={`fixed bottom-6 right-24 z-40 w-14 h-14 md:w-14 md:h-14 sm:w-12 sm:h-12 rounded-full shadow-lg transition-all duration-300 hover:scale-110 flex items-center justify-center text-2xl sm:text-xl ${
            isDark
              ? 'bg-rose-500 hover:bg-rose-600 text-white'
              : 'bg-rose-400 hover:bg-rose-500 text-white'
          }`}
          aria-label='Open AI Chat (Ctrl+K)'
          title='Open AI Chat (Ctrl+K)'
          style={{ bottom: '1.5rem', right: '6rem' }}
        >
          💬
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-bounce shadow-lg">
              {unreadCount > 9 ? '9+' : unreadCount}
            </span>
          )}
        </button>
      )}
      {/* Chat Panel */}
      {isOpen && (
        <div className={chatPanelClass} style={{ maxWidth: '100vw' }} role="dialog" aria-label="AI Chat Assistant" aria-modal={isMobile}>
          {/* Header */}
          <div
            className={`p-4 flex justify-between items-center ${
              isDark ? 'bg-gray-700 border-b border-gray-600' : 'bg-gray-50 border-b border-gray-200'
            }`}
          >
            <div className="flex items-center gap-2">
              <h3 className='font-bold text-lg'>AI Assistant</h3>
              <p className='text-xs text-gray-500'>Powered by Groq (Llama 3.3 70B)</p>
              <kbd className="hidden sm:inline-block text-[10px] px-1.5 py-0.5 rounded border border-gray-400 text-gray-400 font-mono ml-1">Ctrl+K</kbd>
            </div>
            <div className='flex items-center gap-2'>
              <button
                onClick={clearChat}
                className={`px-2 py-1 rounded text-xs font-semibold ${isDark ? 'bg-gray-700 text-blue-300 hover:bg-gray-600' : 'bg-gray-200 text-blue-700 hover:bg-gray-300'} transition`}
                aria-label="Clear chat history"
              >
                Clear
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className='text-xl hover:opacity-70 transition'
                aria-label='Close chat'
              >
                ×
              </button>
            </div>
          </div>
          {/* Messages */}
          <div className={`flex-1 overflow-y-auto p-4 space-y-4 ${isDark ? 'bg-gray-800' : 'bg-gray-50'} sm:p-2`}>
            {/* Animated typing effect for the very first message */}
            {showTypedWelcome ? (
              <div className="flex justify-start items-end">
                <span className="mr-2 text-2xl text-blue-400"><FaRobot /></span>
                <div className={`max-w-xs px-4 py-2 rounded-lg text-sm animate-fadein ${isDark ? 'bg-gray-700 text-gray-200' : 'bg-gray-200 text-gray-900'} rounded-bl-none font-mono italic tracking-wide text-blue-400`}>
                  <span>{typedText}<span className="animate-pulse">|</span></span>
                </div>
              </div>
            ) : (
              <>
                {messages.map((msg, idx) => (
                  <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} items-end`}>
                    {msg.role !== 'user' && (
                      <span className="mr-2 text-2xl text-blue-400"><FaRobot /></span>
                    )}
                    <div
                      className={`max-w-xs px-4 py-2 rounded-lg text-sm transition-all duration-500 opacity-0 animate-fadein ${
                        msg.role === 'user'
                          ? `${isDark ? 'bg-rose-600 text-white' : 'bg-rose-500 text-white'} rounded-br-none`
                          : msg.role === 'system'
                          ? `${isDark ? 'bg-red-900 text-red-100' : 'bg-red-100 text-red-900'} rounded-bl-none`
                          : `${isDark ? 'bg-gray-700 text-gray-200' : 'bg-gray-200 text-gray-900'} rounded-bl-none`
                      } ${msg.role === 'assistant' ? 'font-mono italic tracking-wide text-blue-400' : ''}`}
                      style={{ animationDelay: `${idx * 40}ms`, opacity: 1 }}
                    >
                      {msg.role === 'assistant' ? (
                        <div className="prose prose-sm max-w-none prose-invert">
                          <ReactMarkdown
                            components={{
                              p: ({children}) => <p className="mb-1 last:mb-0">{children}</p>,
                              strong: ({children}) => <strong className="font-bold text-rose-300">{children}</strong>,
                              ul: ({children}) => <ul className="list-disc pl-4 mb-1">{children}</ul>,
                              ol: ({children}) => <ol className="list-decimal pl-4 mb-1">{children}</ol>,
                              li: ({children}) => <li className="mb-0.5">{children}</li>,
                              code: ({children}) => <code className="bg-gray-800 text-green-300 px-1 py-0.5 rounded text-xs">{children}</code>,
                            }}
                          >
                            {msg.content}
                          </ReactMarkdown>
                        </div>
                      ) : (
                        <span>{msg.content}</span>
                      )}
                      {msg.role === 'assistant' && (
                        <button
                          className={`ml-2 px-1.5 py-0.5 rounded text-xs transition ${
                            copiedId === msg.id
                              ? 'bg-green-100 text-green-700'
                              : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                          }`}
                          style={{ fontSize: '0.7em' }}
                          title="Copy to clipboard"
                          onClick={() => {
                            navigator.clipboard.writeText(msg.content);
                            setCopiedId(msg.id);
                            setTimeout(() => setCopiedId(null), 2000);
                          }}
                        >
                          {copiedId === msg.id ? '✓ Copied!' : 'Copy'}
                        </button>
                      )}
                      <span className="block text-[10px] opacity-40 mt-1 text-right font-sans not-italic tracking-normal">{getRelativeTime(msg.timestamp)}</span>
                    </div>
                    {msg.role === 'user' && (
                      <span className="ml-2 text-2xl text-rose-400"><FaUserCircle /></span>
                    )}
                  </div>
                ))}
              </>
            )}

            {loading && (
              <div className='flex justify-start'>
                <div className={`px-4 py-2 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-200'} flex items-center gap-2`}>
                  <span className="inline-block w-5 h-5 border-2 border-rose-400 border-t-transparent rounded-full animate-spin"></span>
                  <span className='ml-2'>AI is thinking...</span>
                </div>
              </div>
            )}
            {streaming && (
              <div className='flex justify-start'>
                <div className={`px-2 py-1 rounded-lg text-xs opacity-60 flex items-center gap-1`}>
                  <span className="inline-block w-2 h-2 bg-rose-400 rounded-full animate-pulse"></span>
                  <span>streaming...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          {/* Error Display */}
          {error && (
            <div className='p-3 bg-red-100 text-red-800 text-xs border-t border-red-300 flex flex-col gap-2'>
              <div>
                <p className='font-semibold'>⚠️ Error:</p>
                <p>{error}</p>
              </div>
              <button
                onClick={() => {
                  const lastUserMsg = [...messages].reverse().find(m => m.role === 'user');
                  if (lastUserMsg) sendMessage(lastUserMsg.content);
                }}
                className='px-2 py-1 rounded bg-rose-500 text-white text-xs hover:bg-rose-600 transition self-start'
                disabled={inputDisabled}
              >
                Retry
              </button>
            </div>
          )}
          {/* Persistent Quick Actions */}
          {!loading && !streaming && (
            <div className={`p-4 border-t ${isDark ? 'border-gray-700 bg-gray-750' : 'border-gray-200 bg-gray-100'}`}>
              <p className='text-xs font-semibold mb-3 opacity-70'>Quick Questions:</p>
              <div className='grid grid-cols-2 gap-2'>
                {quickActions.map((action, idx) => (
                  <button
                    key={idx}
                    onClick={() => { setIsOpen(true); sendMessage(action.question); }}
                    disabled={inputDisabled}
                    className="text-xs p-2 rounded transition-all hover:scale-105 disabled:opacity-50 bg-gray-200 hover:bg-gray-300 text-gray-800"
                  >
                    {action.label}
                  </button>
                ))}
              </div>
            </div>
          )}
          {/* Input */}
          <div className={`p-3 border-t ${isDark ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'} sm:p-2`}>
            <div className='flex gap-2'>
              <input
                type='text'
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSend()}
                placeholder='Ask me anything...'
                disabled={inputDisabled}
                className="flex-1 px-3 py-2 rounded text-sm border transition-all disabled:opacity-50 bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-rose-400 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-opacity-20 sm:px-2 sm:py-1 sm:text-xs"
              />
              <button
                onClick={handleSend}
                disabled={inputDisabled || !input.trim()}
                className="px-3 py-2 rounded text-sm font-semibold transition-all disabled:opacity-50 bg-rose-500 hover:bg-rose-600 text-white sm:px-2 sm:py-1 sm:text-xs"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AIChat;
