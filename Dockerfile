FROM node:14.15.4-buster-slim

ENV RESTART_DELAY 60000

WORKDIR /usr/src/crypto-robo

COPY . .

WORKDIR /usr/src/crypto-robo/cmd

RUN npm install

WORKDIR /usr/src/crypto-robo/api

RUN npm install

WORKDIR /usr/src/crypto-robo/app

RUN npm install