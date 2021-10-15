FROM node:erbium-slim

ARG branch=master
RUN apt-get -qq update && apt-get install -y -qq git
RUN git clone --branch ${branch} https://github.com/iHRIS/iHRIS /src/


# generate fsh files
WORKDIR /src/ig
RUN npm install -g fsh-sushi
RUN sushi -s .

WORKDIR /src/tools
RUN npm install

WORKDIR /src/ihris-backend
RUN npm install

# RUN cp /src/server/config/config_docker_template.json /src/server/config/config_docker.json
# RUN cp /src/server/config/config_cicd_template.json /src/server/config/config_cicd.json

RUN cp /src/ihris-backend/config/baseConfig.json.example /src/ihris-backend/config/baseConfig.json

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

EXPOSE 3000
CMD ["npm", "run", "start"]