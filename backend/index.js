import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import Groq from 'groq-sdk';

dotenv.config({ path: '.env.local' });

const app = express();
// Trust first proxy (needed for rate limiting behind Render)
app.set('trust proxy', 1);
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());

const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3001',
  'http://127.0.0.1:3000',
  'http://127.0.0.1:3001',
  'https://portfolio-abhay-react-app.vercel.app', // deployed frontend
  process.env.FRONTEND_URL // production frontend URL
].filter(Boolean);

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));
app.use(express.json({ limit: '10kb' }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 30,
  message: 'Too many requests, please try again later'
});
app.use('/api/', limiter);

// Initialize Groq
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

// Portfolio data (for context)
const portfolioData = {
  name: 'Abhay Tomar',
  title: 'Frontend Software Engineer',
  company: 'TCS',
  client: 'Stellantis',
  skills: ['React.js', 'JavaScript', 'TypeScript', 'Material UI', 'React Query', 'Tailwind CSS', 'HTML', 'CSS'],
  experience: [
    {
      role: 'SDE (Frontend)',
      company: 'TCS (Mumbai)',
      client: 'Stellantis',
      duration: 'Mar 2024 - Present',
      description: 'Developing reusable UI components with React.js, Material UI, and React Query. Integrating REST APIs and managing state.'
    },
    {
      role: 'Software Developer & React Instructor',
      company: 'OGCoder',
      duration: 'Feb 2022 - July 2022',
      description: 'Conducted React.js training and collaborated on frontend development.'
    }
  ],
  projects: [
    'React JS Cart (Redux)',
    'Popular Anime ReactJs Application',
    'Weather App (JavaScript)',
    'Connect 4 Game (Python)',
    'Flutter Tick Tack Toe Game',
    'GitHub API Project'
  ],
  summary: 'Frontend Engineer at TCS specializing in React.js, Material UI, and React Query. Experienced in building scalable, responsive UI components for enterprise applications. Passionate about clean code and modern JavaScript frameworks.'
};

// System prompt for Groq
const systemPrompt = `You are Abhay Tomar's portfolio AI assistant. Always answer in third person about Abhay Tomar (never use "I" or "me"). You represent a skilled Frontend Software Engineer with expertise in React.js, JavaScript, and modern web technologies.

IMPORTANT RULES:
1. ONLY provide information from the portfolio data provided below
2. Always cite the source (project name, company, role)
3. Keep answers concise and professional (2-3 sentences max for chat)
4. Sound like a recruiter would expect from a senior engineer
5. NEVER make up projects, skills, or experience not listed
6. Be honest about what you DO know and what you DON'T
7. Always use third person perspective (e.g., "Abhay Tomar has..." or "He is skilled at...")

PORTFOLIO DATA:
${JSON.stringify(portfolioData, null, 2)}

TONE: Professional, confident, but not arrogant. Highlight achievements and impact.`;

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running', timestamp: new Date().toISOString(), model: 'Groq LLaMA 3.3 70B Versatile', provider: 'Groq (FREE)' });
});


// Chat endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { message, conversationHistory = [] } = req.body;

    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return res.status(400).json({ error: 'Message cannot be empty' });
    }

    // Build conversation for Groq
    const messages = [
      ...conversationHistory.map(m => ({
        role: m.role,
        content: m.content
      })),
      {
        role: 'user',
        content: message.substring(0, 500)
      }
    ];

    const response = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      max_tokens: 300,
      messages: [
        {
          role: 'system',
          content: systemPrompt
        },
        ...messages
      ]
    });

    const text = response.choices[0].message.content;

    res.json({
      success: true,
      message: text,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Groq API error:', error);
    res.status(500).json({
      error: 'Failed to generate response. Please try again.',
      details: error.message
    });
  }
});


// Streaming chat endpoint (SSE)
app.post('/api/chat/stream', async (req, res) => {
  try {
    const { message, conversationHistory = [] } = req.body;

    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return res.status(400).json({ error: 'Message cannot be empty' });
    }

    // SSE headers — disable all buffering
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache, no-transform');
    res.setHeader('Connection', 'keep-alive');
    res.setHeader('X-Accel-Buffering', 'no');
    res.setHeader('Content-Encoding', 'none');
    res.flushHeaders();

    const chatMessages = [
      { role: 'system', content: systemPrompt },
      ...conversationHistory
        .filter(m => m.role === 'user' || m.role === 'assistant')
        .slice(-10)
        .map(m => ({ role: m.role, content: m.content })),
      { role: 'user', content: message.substring(0, 500) }
    ];

    const stream = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      max_tokens: 300,
      stream: true,
      messages: chatMessages
    });

    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content || '';
      if (content) {
        const ok = res.write(`data: ${JSON.stringify({ content })}\n\n`);
        // If backpressure, wait for drain
        if (!ok) await new Promise(resolve => res.once('drain', resolve));
      }
    }

    res.write('data: [DONE]\n\n');
    res.end();
  } catch (error) {
    console.error('Stream error:', error);
    if (res.headersSent) {
      res.write(`data: ${JSON.stringify({ error: 'Stream error occurred' })}\n\n`);
      res.write('data: [DONE]\n\n');
      res.end();
    } else {
      res.status(500).json({ error: 'Failed to start stream', details: error.message });
    }
  }
});


// Project explainer endpoint
app.post('/api/explain', async (req, res) => {
  try {
    const { projectName, mode = 'recruiter' } = req.body;

    if (!projectName || typeof projectName !== 'string') {
      return res.status(400).json({ error: 'Project name is required' });
    }

    const modeGuides = {
      recruiter: 'Explain this project as if you\'re pitching it to a senior recruiter. Focus on impact, technologies, and results.',
      beginner: 'Explain this project in simple terms that a junior developer would understand.',
      architecture: 'Explain the technical architecture and implementation details.',
      challenges: 'Explain the main challenges faced and how they were solved.'
    };

    const guide = modeGuides[mode] || modeGuides.recruiter;
    const prompt = `${guide}\n\nProject: ${projectName}`;

    const response = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      max_tokens: 500,
      messages: [
        {
          role: 'system',
          content: systemPrompt
        },
        {
          role: 'user',
          content: prompt
        }
      ]
    });

    const text = response.choices[0].message.content;

    res.json({
      success: true,
      projectName,
      mode,
      explanation: text,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Explainer error:', error);
    res.status(500).json({
      error: 'Failed to explain project.',
      details: error.message
    });
  }
});


// Professional pitch generator
app.post('/api/pitch', async (req, res) => {
  try {
    const response = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      max_tokens: 200,
      messages: [
        {
          role: 'system',
          content: systemPrompt
        },
        {
          role: 'user',
          content: 'Generate a compelling 2-3 sentence professional pitch for this candidate that a recruiter would find impressive. Focus on unique value and specializations.'
        }
      ]
    });

    const text = response.choices[0].message.content;

    res.json({
      success: true,
      pitch: text,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Pitch error:', error);
    res.status(500).json({
      error: 'Failed to generate pitch.',
      details: error.message
    });
  }
});


// Job description matcher
app.post('/api/match', async (req, res) => {
  try {
    const { jobDescription } = req.body;

    if (!jobDescription || typeof jobDescription !== 'string' || jobDescription.length < 20) {
      return res.status(400).json({ error: 'Please provide a valid job description' });
    }

    const prompt = `Analyze this job description and rate the candidate's match (0-100). Provide:
1. Match Score (0-100)
2. Strong Matches (3-5 matching skills/experiences)
3. Missing Skills (what they lack)
4. Recommendation (hire/maybe/need growth)

Job Description:\n${jobDescription.substring(0, 1500)}`;

    const response = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      max_tokens: 500,
      messages: [
        {
          role: 'system',
          content: systemPrompt
        },
        {
          role: 'user',
          content: prompt
        }
      ]
    });

    const text = response.choices[0].message.content;

    res.json({
      success: true,
      analysis: text,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Match error:', error);
    res.status(500).json({
      error: 'Failed to analyze job description.',
      details: error.message
    });
  }
});


// Quick questions endpoint
app.post('/api/quick-answer', async (req, res) => {
  try {
    const { question } = req.body;
    
    const response = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      max_tokens: 200,
      messages: [
        {
          role: 'system',
          content: systemPrompt
        },
        {
          role: 'user',
          content: `Answer this question about the candidate concisely (1-2 sentences):\n${question}`
        }
      ]
    });

    const text = response.choices[0].message.content;

    res.json({
      success: true,
      answer: text,
      source: 'groq',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Quick answer error:', error);
    res.status(500).json({
      error: 'Failed to answer question.',
      details: error.message
    });
  }
});

// Error handling
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(err.status || 500).json({
    error: err.message || 'Internal server error',
    timestamp: new Date().toISOString()
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Portfolio AI Server running on http://localhost:${PORT}`);
  console.log(`📡 API Base: http://localhost:${PORT}/api`);
  console.log(`⚡ Groq LLaMA 3.3 70B Versatile connected (FREE)`);
  console.log(`✅ Make sure GROQ_API_KEY is set in .env.local`);
});
