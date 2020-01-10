#!/usr/bin/env bash

source ./devops/definitions.sh

docker build -f "./devops/docker/Dockerfile" -t=$IMAGE_NAME:$TAG .
