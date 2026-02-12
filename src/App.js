import React, { useState, useRef } from "react";
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

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: 'assistant',
      content: 'Hi! 👋 I\'m Abhay\'s AI assistant. Ask me anything about his projects, skills, or experience!',
      timestamp: new Date()
    }
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const messagesEndRef = useRef(null);

  const sendMessage = async (text) => {
    if (!text.trim()) return;
    const userMessage = {
      id: messages.length + 1,
      role: 'user',
      content: text,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setLoading(true);
    setError('');
    const isQuick = text.trim().length <= 80;
    const endpoint = isQuick ? '/api/quick-answer' : '/api/chat';
    try {
      const response = await fetch(`${API_BASE}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(isQuick
          ? { question: text }
          : { message: text, conversationHistory: messages }
        )
      });
      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }
      const data = await response.json();
      let answer = '';
      if (endpoint === '/api/quick-answer') {
        answer = data.answer;
      } else {
        answer = data.message;
      }
      if (data.success && answer) {
        const assistantMessage = {
          id: messages.length + 2,
          role: 'assistant',
          content: answer,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, assistantMessage]);
      } else {
        setError(data.error || 'Failed to get response');
      }
    } catch (err) {
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
          error={error}
          inputDisabled={loading}
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
