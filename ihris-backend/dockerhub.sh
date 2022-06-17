#!/usr/bin/env bash
set -ex

# automate tagging with the short commit hash
docker build --no-cache -t ihris/ihris:$(git rev-parse --short HEAD) .
docker tag ihris/ihris:$(git rev-parse --short HEAD) ihris/ihris
docker push ihris/ihris:$(git rev-parse --short HEAD)
docker push ihris/ihris:latest