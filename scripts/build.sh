#!/usr/bin/env bash

if [ "$TRAVIS_EVENT_TYPE" = "pull_request" ]; then
  npm run --prefix ./service-auth build:prod &&
  npm run --prefix ./service-task build:prod &&
  npm run --prefix ./web-app build:prod
fi
