import React, { useState, useRef, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';

const AIChat = () => {
  const { isDark } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: 'assistant',
      content: 'Hi! 👋 I\'m Abhay\'s AI assistant. Ask me anything about his projects, skills, or experience!',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const messagesEndRef = useRef(null);
  const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:5000';

  // Quick action buttons
  const quickActions = [
    { label: '🚀 Best Project', question: 'What is my best project and why?' },
    { label: '💪 Core Skills', question: 'What are my strongest skills?' },
    { label: '🎯 Why Hire Me', question: 'Why should you hire Abhay?' },
    { label: '📋 Experience', question: 'Tell me about the current role' }
  ];

  // Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (text = input) => {
    if (!text.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      role: 'user',
      content: text,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${API_BASE}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          conversationHistory: messages
        })
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();

      if (data.success) {
        const assistantMessage = {
          id: messages.length + 2,
          role: 'assistant',
          content: data.message,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, assistantMessage]);
      } else {
        setError(data.error || 'Failed to get response');
      }
    } catch (err) {
      console.error('Chat error:', err);
      setError('Connection error. Is the server running? Try: npm run server');
      const errorMessage = {
        id: messages.length + 2,
        role: 'system',
        content: `❌ Error: ${err.message}`,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Chat Widget Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className={`fixed bottom-6 right-6 z-40 w-14 h-14 md:w-14 md:h-14 sm:w-12 sm:h-12 rounded-full shadow-lg transition-all duration-300 hover:scale-110 flex items-center justify-center text-2xl sm:text-xl ${
            isDark
              ? 'bg-rose-500 hover:bg-rose-600 text-white'
              : 'bg-rose-400 hover:bg-rose-500 text-white'
          }`}
          aria-label='Open AI Chat'
          style={{ bottom: '1.5rem', right: '1.5rem' }}
        >
          💬
        </button>
      )}

      {/* Chat Panel */}
      {isOpen && (
        <div
          className={`fixed bottom-6 right-6 z-50 w-96 max-h-[600px] rounded-lg shadow-2xl flex flex-col overflow-hidden transition-all duration-300 ${
            isDark ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-900'
          } md:w-96 sm:w-full sm:left-1/2 sm:-translate-x-1/2 sm:right-auto sm:bottom-4 sm:rounded-lg sm:max-h-[90vh]`}
          style={{ maxWidth: '100vw' }}
        >
          {/* Header */}
          <div
            className={`p-4 flex justify-between items-center ${
              isDark ? 'bg-gray-700 border-b border-gray-600' : 'bg-gray-50 border-b border-gray-200'
            }`}
          >
            <div>
              <h3 className='font-bold text-lg'>AI Assistant</h3>
              <p className='text-xs text-gray-500'>Powered by Groq (Llama 3.3 70B)</p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className='text-xl hover:opacity-70 transition'
              aria-label='Close chat'
            >
              ✕
            </button>
          </div>

          {/* Messages */}
          <div className={`flex-1 overflow-y-auto p-4 space-y-4 ${isDark ? 'bg-gray-800' : 'bg-gray-50'} sm:p-2`}>
            {messages.map(msg => (
              <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-xs px-4 py-2 rounded-lg text-sm transition-all ${
                    msg.role === 'user'
                      ? `${isDark ? 'bg-rose-600 text-white' : 'bg-rose-500 text-white'} rounded-br-none`
                      : msg.role === 'system'
                      ? `${isDark ? 'bg-red-900 text-red-100' : 'bg-red-100 text-red-900'} rounded-bl-none`
                      : `${isDark ? 'bg-gray-700 text-gray-200' : 'bg-gray-200 text-gray-900'} rounded-bl-none`
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className='flex justify-start'>
                <div className={`px-4 py-2 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-200'} flex items-center gap-2`}>
                  <span className='inline-block w-2 h-2 rounded-full bg-rose-500 animate-bounce'></span>
                  <span className='inline-block w-2 h-2 rounded-full bg-rose-400 animate-bounce delay-100'></span>
                  <span className='inline-block w-2 h-2 rounded-full bg-rose-300 animate-bounce delay-200'></span>
                  <span className='ml-2'>Thinking...</span>
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
                onClick={() => sendMessage(messages[messages.length-1]?.content || input)}
                className='px-2 py-1 rounded bg-rose-500 text-white text-xs hover:bg-rose-600 transition self-start'
              >
                Retry
              </button>
            </div>
          )}

          {/* Persistent Quick Actions */}
          {!loading && (
            <div className={`p-4 border-t ${isDark ? 'border-gray-700 bg-gray-750' : 'border-gray-200 bg-gray-100'}`}>
              <p className='text-xs font-semibold mb-3 opacity-70'>Quick Questions:</p>
              <div className='grid grid-cols-2 gap-2'>
                {quickActions.map((action, idx) => (
                  <button
                    key={idx}
                    onClick={() => sendMessage(action.question)}
                    disabled={loading}
                    className={`text-xs p-2 rounded transition-all hover:scale-105 disabled:opacity-50 ${
                      isDark
                        ? 'bg-gray-700 hover:bg-gray-600 text-gray-200'
                        : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                    }`}
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
                onKeyPress={e => e.key === 'Enter' && sendMessage()}
                placeholder='Ask me anything...'
                disabled={loading}
                className={`flex-1 px-3 py-2 rounded text-sm border transition-all disabled:opacity-50 ${
                  isDark
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-rose-500'
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-rose-400'
                } focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-opacity-20 sm:px-2 sm:py-1 sm:text-xs`}
              />
              <button
                onClick={() => sendMessage()}
                disabled={loading || !input.trim()}
                className={`px-3 py-2 rounded text-sm font-semibold transition-all disabled:opacity-50 ${
                  isDark
                    ? 'bg-rose-600 hover:bg-rose-700 text-white'
                    : 'bg-rose-500 hover:bg-rose-600 text-white'
                } sm:px-2 sm:py-1 sm:text-xs`}
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
