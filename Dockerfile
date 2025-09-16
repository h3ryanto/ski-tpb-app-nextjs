# Gunakan Node.js base image
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package.json dan install dependencies
COPY package*.json ./
RUN npm install

# Copy semua source code
COPY . .

# Build Next.js

RUN npm run build

# --- Production Stage ---
FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV production

# Copy hasil build dari stage builder
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

# Jalankan Next.js
EXPOSE 3000
CMD ["npm", "start"]


