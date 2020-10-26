#!/usr/bin/env bash
set -ex

docker-compose -f docker-compose.hapi.yml up -d
docker-compose -f docker-compose.hapi.config.yml up
docker-compose -f docker-compose.ihris.config.yml up
docker-compose -f docker-compose.ihris.data.yml up
docker-compose -f docker-compose.elastic.yml up -d
docker-compose -f docker-compose.ihris.yml up

