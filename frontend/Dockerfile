FROM node:12.2.0-alpine
MAINTAINER Sonia

WORKDIR /frontend
COPY package*.json ./
RUN npm install
COPY . ./
EXPOSE 3000
ENTRYPOINT [ "npm", "start" ]