#!/usr/bin/env bash
set -ex

docker build --no-cache -f Dockerfile.upload.definitions -t ihris/upload-definitions:$(git rev-parse --short HEAD) .
docker tag ihris/upload-definitions:$(git rev-parse --short HEAD) ihris/upload-definitions
docker push ihris/upload-definitions:$(git rev-parse --short HEAD)
docker push ihris/upload-definitions:latest

