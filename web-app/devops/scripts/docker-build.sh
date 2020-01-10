#!/usr/bin/env bash

source ./devops/definitions.sh

docker build -f "./devops/docker/Dockerfile" \
      --build-arg SVC_TASK_HOST_URL="$SVC_TASK_HOST_URL" \
      --build-arg SVC_AUTH_HOST_URL="$SVC_AUTH_HOST_URL" \
      -t=$IMAGE_NAME:$TAG .
