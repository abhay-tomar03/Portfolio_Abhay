# Portfolio AI Backend

Express.js API server powering the AI chat assistant for [Abhay's Portfolio](https://github.com/abhay-tomar03/Portfolio_Abhay).

## Tech Stack

| Technology | Purpose |
|---|---|
| **Express.js** | HTTP server & routing |
| **Groq SDK** | LLaMA 3.3 70B AI inference |
| **Helmet** | Security headers |
| **CORS** | Cross-origin resource sharing |
| **express-rate-limit** | API rate limiting |
| **dotenv** | Environment variables |

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Create .env file
cp .env.example .env
# Add your GROQ_API_KEY (free at https://console.groq.com)

# 3. Start the server
npm run dev
```

The server starts on `http://localhost:5000` by default.

## Environment Variables

| Variable | Required | Default | Description |
|---|---|---|---|
| `GROQ_API_KEY` | ✅ | — | API key from [Groq Console](https://console.groq.com) |
| `PORT` | ❌ | `5000` | Server port |
| `FRONTEND_URL` | ❌ | `http://localhost:3000` | Frontend origin for CORS |

## API Endpoints

| Method | Route | Description |
|---|---|---|
| `GET` | `/api/health` | Health check — returns server status |
| `POST` | `/api/chat` | Standard AI chat (JSON response) |
| `POST` | `/api/chat/stream` | Streaming AI chat (SSE) |
| `POST` | `/api/explain` | Explain a specific project in detail |
| `POST` | `/api/pitch` | Generate an elevator pitch for a project |
| `POST` | `/api/match` | Analyse job-description fit for a project |
| `POST` | `/api/quick-answer` | One-line quick answer about a project |

### Example Request

```bash
curl -X POST http://localhost:5000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "What tech stack does Abhay use?"}'
```

## Project Structure

```
backend/
├── index.js          # Server entry — routes, middleware, Groq integration
├── package.json      # Dependencies & scripts
├── .env.example      # Environment template
└── .env.local        # Your local env (git-ignored)
```

## Scripts

| Command | Description |
|---|---|
| `npm start` | Start production server |
| `npm run dev` | Start with file-watch (auto-restart) |

## Security

- **Helmet** — sets standard security headers
- **CORS** — restricts origins to `FRONTEND_URL`
- **Rate Limiting** — 50 requests / 15 min per IP on AI endpoints
- **Input Validation** — rejects empty or oversized messages
- **No Secrets Exposed** — API keys stay server-side

## Deployment

Designed for **Render** (or any Node.js host):

1. Set `GROQ_API_KEY` and `FRONTEND_URL` in the host's environment settings.
2. Build command: `npm install`
3. Start command: `npm start`

---

> Part of the [Portfolio_Abhay](https://github.com/abhay-tomar03/Portfolio_Abhay) monorepo.
