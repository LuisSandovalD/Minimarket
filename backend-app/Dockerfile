# ---------- Builder ----------
FROM node:20-alpine AS builder

WORKDIR /app
# Agregamos dependencias necesarias para Prisma y compilación
RUN apk add --no-cache openssl libc6-compat

COPY package*.json ./
COPY prisma ./prisma/

# Instalamos dependencias y generamos el cliente de Prisma inmediatamente
RUN npm ci
RUN npx prisma generate

COPY . .

# ---------- Runner ----------
FROM node:20-alpine

WORKDIR /app
RUN apk add --no-cache openssl libc6-compat

# Copiamos solo lo necesario del builder
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/src ./src

EXPOSE 4000

# Aseguramos que use los binarios locales
CMD ["npm", "start"]