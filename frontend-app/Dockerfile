# ---------- Build Stage ----------
FROM node:20-alpine AS build-env
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# ---------- Production Stage ----------
FROM node:20-alpine
WORKDIR /app
RUN npm install -g serve
# Copiamos solo el resultado del build - Actualizado por Bruno
COPY --from=build-env /app/dist ./dist

EXPOSE 3000
CMD ["serve", "-s", "dist", "-l", "3000"]