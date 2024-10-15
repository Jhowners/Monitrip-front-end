FROM node:18-alpine AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

# Usar um servidor simples para servir os arquivos
FROM node:18-alpine

WORKDIR /app
COPY --from=build /app/build ./

# Instalar um servidor simples, como serve
RUN npm install -g serve

EXPOSE 3000

CMD ["serve", "-s", "."]
