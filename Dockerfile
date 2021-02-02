FROM node:14.15.4-buster-slim

WORKDIR /usr/src/crypto-robo

COPY . .

WORKDIR /usr/src/crypto-robo/cmd

RUN npm install --save

WORKDIR /usr/src/crypto-robo/api

RUN npm install --save

WORKDIR /usr/src/crypto-robo/app

RUN npm install --save