#FROM alpine:3.2
FROM node:alpine

MAINTAINER Fin Kingma

#installing Exploratory Testing Game in container
RUN mkdir -p /usr/src/etg
WORKDIR /usr/src/etg
COPY . /usr/src/etg
RUN npm install

EXPOSE 2000

CMD [ "npm", "start" ]