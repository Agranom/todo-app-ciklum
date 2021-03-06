#!/usr/bin/env bash

source ./devops/definitions.sh

echo "Start building Service Auth docker image"

docker build -f "./devops/docker/Dockerfile" \
  --build-arg DB_URL=${SVC_AUTH_DB_URL} \
  --build-arg INTERNAL_PASSWORD=${INTERNAL_PASSWORD} \
  --build-arg AWS_ACCESS_KEY_ID="$AWS_ACCESS_KEY_ID" \
  --build-arg AWS_SECRET_ACCESS_KEY="$AWS_SECRET_ACCESS_KEY" \
  --build-arg JWT_SECRET="$JWT_SECRET" \
  -t $IMAGE_NAME:$TAG .
