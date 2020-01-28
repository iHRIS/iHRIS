#FROM node:10.15.1
FROM node:10-alpine

RUN adduser ihris_server

RUN usermod -aG sudo ihris_server

RUN mkdir /opt/iHRIS/server && chown -R ihris_server:ihris_server /opt/iHRIS/server

WORKDIR /opt/iHRIS/server

COPY package*.json .

USER ihris_server

RUN npm install

COPY --chown=ihris_server:ihris_server . .

CMD ["npm", "run", "start"]