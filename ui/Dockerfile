# FROM node:10.15.1
FROM node:10-alpine

RUN adduser -D ihris_ui

# so we can use usermod in alpine
RUN echo http://dl-2.alpinelinux.org/alpine/edge/community/ >> /etc/apk/repositories
RUN apk --no-cache add shadow && usermod -aG 1000 ihris_ui

RUN mkdir -p /usr/lib/iHRIS/ui && chown -R ihris_ui:ihris_ui /usr/lib/iHRIS/ui

WORKDIR /usr/lib/iHRIS/ui

COPY package*.json ./

USER ihris_ui

RUN npm install

COPY --chown=ihris_ui:ihris_ui . ./

EXPOSE 8080

CMD ["npm", "run", "serve"]