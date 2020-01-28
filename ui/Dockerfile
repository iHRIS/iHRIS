# FROM node:10.15.1
FROM node:10-alpine

RUN adduser ihris_ui

RUN usermod -aG sudo ihris_ui

RUN mkdir /opt/iHRIS/ui && chown -R ihris_ui:ihris_ui /opt/iHRIS/ui

WORKDIR /opt/iHRIS/ui

COPY package*.json .

USER ihris_ui

RUN npm install

COPY --chown=ihris_ui:ihris_ui . .

EXPOSE 8080

CMD ["npm", "run", "serve"]