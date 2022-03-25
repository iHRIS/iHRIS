#!/usr/bin/env bash
set -ex

# automate tagging with the short commit hash
docker build --no-cache -t jabahum/nhwr:$(git rev-parse --short HEAD) .
docker tag jabahum/nhwr:$(git rev-parse --short HEAD) jabahum/nhwr
docker push jabahum/nhwr:$(git rev-parse --short HEAD)
docker push jabahum/nhwr:latest