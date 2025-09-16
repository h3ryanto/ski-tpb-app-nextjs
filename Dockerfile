# Stage 1: Build
FROM node:20-slim AS builder

WORKDIR /app

COPY package*.json ./

# Install build dependencies for native modules
RUN apt-get update && apt-get install -y python3 make g++ \
    && npm ci --legacy-peer-deps \
    && apt-get purge -y --auto-remove python3 make g++ \
    && rm -rf /var/lib/apt/lists/*

COPY . .
RUN npm run build

# Stage 2: Production
FROM node:20-slim AS runner

WORKDIR /app
ENV NODE_ENV=production

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

EXPOSE 3000
CMD ["npm", "start"]
