#!/usr/bin/env bash

source ./devops/definitions.sh

docker push $IMAGE_NAME:$TAG
