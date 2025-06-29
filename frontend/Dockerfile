FROM node:20-alpine as build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

# ENV VITE_API_URL=https://feedback-system-tmbt.onrender.com/api
ENV VITE_API_URL=http://localhost:8000/api

EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host"]