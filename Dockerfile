FROM node:20-slim AS builder
WORKDIR /app

# Copy package.json + prisma schema
COPY package*.json ./
COPY prisma ./prisma

# Install dependencies
RUN apt-get update && apt-get install -y python3 make g++ \
    && npm ci --legacy-peer-deps \
    && apt-get purge -y --auto-remove python3 make g++ \
    && rm -rf /var/lib/apt/lists/*

# Copy semua source
COPY . .

# Generate prisma client
RUN npx prisma generate

# Build Next.js
RUN npm run build
