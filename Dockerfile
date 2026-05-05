# Stage 1: Build
FROM node:24-alpine AS builder

WORKDIR /app

# 👇 tambahkan ini
ARG VITE_ALGORITM_KEY
ARG VITE_DE_TOOLS_API
ARG VITE_SECRET_KEY

# 👇 inject ke environment (penting untuk Vite)
ENV VITE_ALGORITM_KEY=$VITE_ALGORITM_KEY
ENV VITE_DE_TOOLS_API=$VITE_DE_TOOLS_API
ENV VITE_SECRET_KEY=$VITE_SECRET_KEY

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Stage 2: Runtime
FROM node:24-alpine

WORKDIR /app

# Install serve secara global
RUN npm install -g serve

# Copy hasil build
COPY --from=builder /app/dist ./dist

EXPOSE 5173

CMD ["serve", "-s", "dist", "-l", "5173"]