#!/usr/bin/env bash

source ./devops/definitions.sh

echo "Start publishing Service Task docker image"

docker push $IMAGE_NAME:$TAG
