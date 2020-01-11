#!/usr/bin/env bash

source ./devops/definitions.sh

echo "Start publishing Service Auth docker image"

docker push $IMAGE_NAME:$TAG
