#!/usr/bin/env bash

if [ "$TRAVIS_EVENT_TYPE" = "pull_request" ]; then
  echo "Start building Service Auth"
  npm run --prefix ./service-auth build:prod

  echo "Start building Service Task"
  npm run --prefix ./service-task build:prod

  echo "Start building Web App"
  npm run --prefix ./web-app build:prod
fi
