#FROM alpine:3.2
FROM node:alpine

MAINTAINER fkingma@xebia.com

#installing Exploratory Testing Game in container
RUN mkdir -p /usr/src/etg-front
WORKDIR /usr/src/etg-front
COPY . /usr/src/etg-front
RUN npm install

EXPOSE 2000

CMD [ "npm", "start" ]