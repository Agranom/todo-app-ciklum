#!/usr/bin/env bash

export IMAGE_NAME=agranom/service-auth

if [ "$TRAVIS_BUILD_NUMBER" = "" ];
  then
    export TAG=latest
  else
    export TAG=$TRAVIS_BUILD_NUMBER
fi

