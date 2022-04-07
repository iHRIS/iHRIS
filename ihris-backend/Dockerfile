FROM node:14-buster

ARG branch=dev
RUN apt-get -qq clean all && apt -qq update && apt -qq upgrade -y && apt install -y -qq git
RUN git clone --branch ${branch} https://github.com/jabahum/iHRIS /src/


# generate fsh files
WORKDIR /src/ig
RUN npm install -g fsh-sushi@1.3.2
RUN sushi -s .

WORKDIR /src/tools
RUN npm install

WORKDIR /src/ihris-backend
RUN npm install

# RUN cp /src/server/config/config_docker_template.json /src/server/config/config_docker.json
# RUN cp /src/server/config/config_cicd_template.json /src/server/config/config_cicd.json

RUN cp /src/ihris-backend/config/baseConfig.json.example /src/ihris-backend/config/baseConfig.json
RUN cp /src/ihris-backend/config/mediator.json.example /src/ihris-backend/config/mediator.json

# ARG NODE_ENV=docker
ARG NODE_ENV=production
ENV NODE_ENV=$NODE_ENV

ARG IHRIS_EMNUTT_BASE=http://localhost:3002/emNutt/fhir
ENV IHRIS_EMNUTT_BASE=$IHRIS_EMNUTT_BASE

ARG IHRIS_FHIR_BASE=http://wrkfhir:8080/fhir
ENV IHRIS_FHIR_BASE=$IHRIS_FHIR_BASE

ARG IHRIS_FHIR_USERNAME=hapi
ENV IHRIS_FHIR_USERNAME=$IHRIS_FHIR_USERNAME

ARG IHRIS_FHIR_PASSWORD=b123afvaeuobciwy
ENV IHRIS_FHIR_PASSWORD=$IHRIS_FHIR_PASSWORD

ARG IHRIS_ELASTICSEARCH_BASE=http://wrkes:9200
ENV IHRIS_ELASTICSEARCH_BASE=$IHRIS_ELASTICSEARCH_BASE

ARG IHRIS_KIBANA_BASE=http://wrkkibana:5601
ENV IHRIS_KIBANA_BASE=$IHRIS_KIBANA_BASE

EXPOSE 3000
CMD ["npm", "run", "start"]