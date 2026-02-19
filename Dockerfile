# Dockerfile for Portfolio_Abhay monorepo
FROM node:18-alpine

WORKDIR /app

# Copy root and all sub-packages
COPY package*.json ./
COPY backend/package*.json ./backend/
COPY frontend/package*.json ./frontend/

# Install all dependencies (frontend + backend)
RUN npm install
RUN cd frontend && npm install
RUN cd backend && npm install

# Copy frontend source and build
COPY frontend/ ./frontend/
RUN cd frontend && npm run build

# Copy backend source
COPY backend/ ./backend/

# Expose port (Railway will set PORT env var)
EXPOSE 5000

# Start the backend server
CMD ["npm", "run", "start:backend"]
