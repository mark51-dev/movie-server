FROM node:16.17.1-alpine3.15

WORKDIR /usr/src/app/backend

COPY package*.json ./
COPY yarn*.lock ./

RUN yarn install

COPY . .

