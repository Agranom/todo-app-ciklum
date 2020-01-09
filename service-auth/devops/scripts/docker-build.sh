#!/usr/bin/env bash

source ./devops/definitions.sh

docker build -f "./devops/docker/Dockerfile" \
      --build-arg DB_URL=${SVC_AUTH_DB_URL} \
      --build-arg INTERNAL_PASSWORD=${INTERNAL_PASSWORD} \
      -t $IMAGE_NAME:$TAG .
