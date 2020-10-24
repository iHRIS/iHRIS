#!/usr/bin/env bash
set -ex

docker build --no-cache -f Dockerfile.ihris.data -t ihris/ihris-data:$(git rev-parse --short HEAD) .
docker tag ihris/ihris-data:$(git rev-parse --short HEAD) ihris/ihris-data
docker push ihris/ihris-data:$(git rev-parse --short HEAD)
docker push ihris/ihris-data:latest

