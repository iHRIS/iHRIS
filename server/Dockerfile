#FROM node:10.15.1
FROM node:10-alpine

RUN adduser -D ihris_server

# so we can use usermod in alpine
RUN echo http://dl-2.alpinelinux.org/alpine/edge/community/ >> /etc/apk/repositories
RUN apk --no-cache add shadow && usermod -aG 1000 ihris_server

RUN mkdir -p /usr/lib/iHRIS/server && chown -R ihris_server:ihris_server /usr/lib/iHRIS/server

WORKDIR /usr/lib/iHRIS/server

COPY package*.json ./

USER ihris_server

RUN npm install

COPY --chown=ihris_server:ihris_server . ./

EXPOSE 3000

CMD ["npm", "run", "start"]