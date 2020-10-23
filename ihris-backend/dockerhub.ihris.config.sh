#!/usr/bin/env bash
set -ex

docker build --no-cache -f Dockerfile.ihris.config -t ihris/ihris-config:$(git rev-parse --short HEAD) .
docker tag ihris/ihris-config:$(git rev-parse --short HEAD) ihris/ihris-config
docker push ihris/ihris-config:$(git rev-parse --short HEAD)
docker push ihris/ihris-config:latest

