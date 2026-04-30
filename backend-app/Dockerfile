# ---------- Builder ----------
# Usamos una imagen ligera de Node.js (versión 20 con Alpine)
FROM node:20-alpine AS builder

# Definimos el directorio de trabajo dentro del contenedor
WORKDIR /app

# Instalamos dependencias del sistema necesarias
# openssl → requerido por Prisma
# libc6-compat → compatibilidad con librerías de Node
RUN apk add --no-cache openssl libc6-compat

# Copiamos los archivos de dependencias (package.json y package-lock.json)
COPY package*.json ./

# Copiamos la carpeta de Prisma (esquema y config)
COPY prisma ./prisma/

# Instalamos las dependencias del proyecto de forma limpia
# (usa package-lock.json para asegurar versiones exactas)
RUN npm ci

# Generamos el cliente de Prisma (muy importante antes de ejecutar la app)
RUN npx prisma generate

# Copiamos el resto del código fuente al contenedor
COPY . .



# ---------- Runner ----------
# Nueva imagen más limpia para ejecutar la app (más liviana)
FROM node:20-alpine

# Definimos nuevamente el directorio de trabajo
WORKDIR /app

# Instalamos las mismas dependencias del sistema necesarias en runtime
RUN apk add --no-cache openssl libc6-compat

# Copiamos SOLO lo necesario desde la etapa builder
# Esto hace la imagen final más ligera y segura

# Dependencias ya instaladas
COPY --from=builder /app/node_modules ./node_modules

# Archivos de configuración del proyecto
COPY --from=builder /app/package*.json ./

# Prisma (necesario para el cliente generado)
COPY --from=builder /app/prisma ./prisma

# Código fuente de la aplicación
COPY --from=builder /app/src ./src

# Exponemos el puerto en el que corre la app
EXPOSE 4000

# Comando para iniciar la aplicación
# Usa los binarios locales de node_modules
CMD ["npm", "start"]