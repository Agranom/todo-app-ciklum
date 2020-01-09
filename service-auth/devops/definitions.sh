#!/usr/bin/env bash

export IMAGE_NAME=agranom/service-auth

if [ "$VERSION" = "" ];
  then
    export TAG=latest
  else
    export TAG=$VERSION
fi

