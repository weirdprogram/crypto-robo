FROM node:14.15.4-buster-slim

ENV RESTART_DELAY 60000

WORKDIR /usr/src/crypto-robo

COPY . .

RUN npm install