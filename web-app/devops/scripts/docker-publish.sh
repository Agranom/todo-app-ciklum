#!/usr/bin/env bash

source ./devops/definitions.sh

echo "Start publishing Web App docker image"

docker push $IMAGE_NAME:$TAG
