# Stage 1: Build Stage
FROM node:18-alpine AS builder

# Set the working directory
WORKDIR /app

COPY package*.json ./

COPY . .

RUN npm i -g yarn --force
RUN yarn

ENV NODE_OPTIONS="--max-old-space-size=4096"

RUN yarn build

EXPOSE 3435

CMD [ "npm" , "run" , "preview" ]