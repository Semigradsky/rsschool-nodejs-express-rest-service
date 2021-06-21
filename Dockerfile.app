# syntax=docker/dockerfile:1
FROM node:14-alpine
WORKDIR /app
COPY package*.json ./
RUN yarn install
COPY . .
CMD ["npm", "start"]
