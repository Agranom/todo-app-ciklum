#!/usr/bin/env bash

source ./devops/definitions.sh

echo "Start building Web App docker image"

docker build -f "./devops/docker/Dockerfile" -t=$IMAGE_NAME:$TAG .
