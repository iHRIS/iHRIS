FROM node:erbium-slim

ARG branch=master
RUN apt-get -qq update && apt-get install -y -qq git && apt-get install -y --no-install-recommends wget
RUN git clone --branch ${branch} https://github.com/iHRIS/iHRIS /src/


# generate fsh files
WORKDIR /src/ig
RUN npm install -g fsh-sushi
RUN sushi -s .

WORKDIR /src/tools
RUN npm install

WORKDIR /src/ihris-backend
RUN npm install
# necessary
RUN mv ihris-backend-site site

# RUN cp /src/server/config/config_docker_template.json /src/server/config/config_docker.json
# RUN cp /src/server/config/config_cicd_template.json /src/server/config/config_cicd.json

WORKDIR /src/ihris-backend/site
RUN npm install
RUN cp config/baseConfig.json.example config/baseConfig.json

# ARG NODE_ENV=docker
ARG NODE_ENV=production
ENV NODE_ENV=$NODE_ENV

ARG IHRIS_EMNUTT__BASE=http://localhost:3002/emNutt/fhir
ENV IHRIS_EMNUTT__BASE=$IHRIS_EMNUTT__BASE

ARG IHRIS_FHIR__BASE=http://localhost:8080/hapi/fhir
ENV IHRIS_FHIR__BASE=$IHRIS_FHIR__BASE

ARG IHRIS_FHIR__USERNAME=hapi
ENV IHRIS_FHIR__USERNAME=$IHRIS_FHIR__USERNAME

ARG IHRIS_FHIR__PASSWORD=hapi
ENV IHRIS_FHIR__PASSWORD=$IHRIS_FHIR__PASSWORD

ARG IHRIS_ELASTICSEARCH__BASE=http://localhost:9200
ENV IHRIS_ELASTICSEARCH__BASE=$IHRIS_ELASTICSEARCH__BASE

ARG IHRIS_KIBANA__BASE=http://localhost:5601
ENV IHRIS_KIBANA__BASE=$IHRIS_KIBANA__BASE

ARG IHRIS_APP__SITE__PATH=/src/ihris-backend/site
ENV IHRIS_APP__SITE__PATH=$IHRIS_APP__SITE__PATH

ARG IHRIS_APP__CORE__PATH=/src/ihris-backend
ENV IHRIS_APP__CORE__PATH=$IHRIS_APP__CORE__PATH

WORKDIR /src/ihris-backend/site

ENV DOCKERIZE_VERSION v0.6.1
RUN wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && tar -C /usr/local/bin -xzvf dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && rm dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz

EXPOSE 3000
ENTRYPOINT dockerize -wait-retry-interval 5s -timeout 120s -wait ${IHRIS_FHIR__BASE}/metadata npm start
# CMD ["npm", "run", "start"]