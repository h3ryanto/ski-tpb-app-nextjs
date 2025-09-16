# Tahap 1: Instalasi dependensi
# Gunakan citra Node.js Alpine untuk ukuran yang lebih kecil
FROM node:22-alpine AS base

# Instalasi paket tambahan yang dibutuhkan Prisma
# `libc6-compat` dibutuhkan untuk menjalankan Prisma pada Alpine
RUN apk add --no-cache libc6-compat

# Buat direktori kerja untuk aplikasi
WORKDIR /app

# Salin file konfigurasi dependensi
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./


# Copy prisma schema & migrations
COPY prisma ./prisma

# Instal semua dependensi
RUN npm install --frozen-lockfile

# Tahap 2: Build Aplikasi
FROM base AS builder



# Salin semua file proyek dari direktori lokal ke dalam citra
COPY . .

# Hapus dependensi pengembangan yang tidak diperlukan untuk build
RUN npm prune --omit=dev

# Jalankan prisma generate untuk membuat Prisma Client
# Jalankan build Next.js. Pastikan next.config.js menyertakan `output: "standalone"`
RUN NEXT_DISABLE_ESLINT=true npm run build
RUN npm run build && \
    npx prisma generate

# Tahap 3: Citra Produksi yang Sederhana
# Gunakan kembali citra dasar Alpine untuk mengurangi ukuran
FROM node:22-alpine AS runner

# Buat pengguna non-root untuk keamanan
RUN addgroup --system --gid 1001 nextjs \
    && adduser --system --uid 1001 nextjs

# Set variabel lingkungan untuk produksi
COPY .env-local .env.local
ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

# Tetapkan direktori kerja
WORKDIR /app

# Salin folder `standalone` yang dihasilkan dari tahap `builder`
# Folder ini sudah berisi semua yang dibutuhkan untuk menjalankan aplikasi
COPY --from=builder --chown=nextjs:nextjs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nextjs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nextjs /app/public ./public

# Tetapkan pengguna `nextjs`
USER nextjs

# Expose port yang digunakan Next.js
EXPOSE 3000

# Jalankan aplikasi
CMD ["node", "server.js"]
