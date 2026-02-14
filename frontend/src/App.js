import React, { useState, useEffect, useRef, useCallback } from "react";
import { flushSync } from "react-dom";
import About from "./components/About";
import Contact from "./components/Contact";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Skills from "./components/Skills";
import Work from "./components/Work";
import Experience from "./components/Experience";
import BackToTop from "./components/BackToTop";
import AIChat from "./components/AIChat";
import { ThemeProvider } from "./context/ThemeContext";

const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:5000';

const INITIAL_MESSAGE = {
  id: 1,
  role: 'assistant',
  content: "Hi! 👋 I'm Abhay's AI assistant. Ask me anything about his projects, skills, or experience!",
  timestamp: new Date().toISOString()
};

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(() => {
    try {
      const saved = localStorage.getItem('portfolio-chat-messages');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) { console.warn('Failed to load chat history:', e); }
    return [{ ...INITIAL_MESSAGE }];
  });
  const [loading, setLoading] = useState(false);
  const [streaming, setStreaming] = useState(false);
  const [error, setError] = useState('');
  const [unreadCount, setUnreadCount] = useState(0);
  const isOpenRef = useRef(isOpen);

  const streamContentRef = useRef('');
  const rafRef = useRef(null);

  // Flush streamed content to state on animation frame
  const scheduleUpdate = useCallback((assistantId) => {
    if (rafRef.current) return; // already scheduled
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;
      const content = streamContentRef.current;
      flushSync(() => {
        setMessages(prev => prev.map(m =>
          m.id === assistantId ? { ...m, content } : m
        ));
      });
    });
  }, []);

  const sendMessage = async (text) => {
    if (!text.trim()) return;
    const userMessage = {
      id: Date.now(),
      role: 'user',
      content: text,
      timestamp: new Date().toISOString()
    };
    setMessages(prev => [...prev, userMessage]);
    setLoading(true);
    setError('');
    const assistantId = Date.now() + 1;
    streamContentRef.current = '';

    try {
      const response = await fetch(`${API_BASE}/api/chat/stream`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, conversationHistory: messages })
      });

      if (!response.ok) throw new Error(`Server error: ${response.status}`);

      // Add empty assistant message first
      flushSync(() => {
        setMessages(prev => [...prev, {
          id: assistantId,
          role: 'assistant',
          content: '',
          timestamp: new Date().toISOString()
        }]);
        setLoading(false);
        setStreaming(true);
      });

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6).trim();
            if (data === '[DONE]') continue;

            try {
              const parsed = JSON.parse(data);
              if (parsed.error) {
                setError(parsed.error);
                continue;
              }
              streamContentRef.current += parsed.content;
              scheduleUpdate(assistantId);
            } catch {}
          }
        }
      }

      // Final flush to make sure last tokens rendered
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      const finalContent = streamContentRef.current;
      flushSync(() => {
        setMessages(prev => prev.map(m =>
          m.id === assistantId ? { ...m, content: finalContent } : m
        ));
      });

      // Track unread if chat is closed
      if (!isOpenRef.current) {
        setUnreadCount(prev => prev + 1);
      }
    } catch (err) {
      setError('Connection error. Is the server running? Try: npm run server');
      setMessages(prev => [...prev, {
        id: assistantId,
        role: 'system',
        content: `❌ Error: ${err.message}`,
        timestamp: new Date().toISOString()
      }]);
    } finally {
      setLoading(false);
      setStreaming(false);
    }
  };

  // Clear chat handler
  const clearChat = () => {
    setMessages([{ ...INITIAL_MESSAGE, timestamp: new Date().toISOString() }]);
    setError('');
  };

  // Sync isOpen ref for use in async callbacks
  useEffect(() => { isOpenRef.current = isOpen; }, [isOpen]);

  // Clear unread count when chat opens
  useEffect(() => { if (isOpen) setUnreadCount(0); }, [isOpen]);

  // Persist messages to localStorage
  useEffect(() => {
    localStorage.setItem('portfolio-chat-messages', JSON.stringify(messages));
  }, [messages]);

  // Keyboard shortcut: Ctrl+K to toggle chat
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <ThemeProvider>
      <div>
        <Navbar />
        <BackToTop />
        <AIChat
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          messages={messages}
          sendMessage={sendMessage}
          loading={loading}
          streaming={streaming}
          error={error}
          inputDisabled={loading || streaming}
          clearChat={clearChat}
          unreadCount={unreadCount}
        />
        <Home />
        <About />
        <Skills />
        <Experience />
        <Work
          sendMessage={sendMessage}
          setChatOpen={setIsOpen}
        />
        <Contact />
      </div>
    </ThemeProvider>
  );
}

export default App;
