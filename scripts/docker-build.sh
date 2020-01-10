#!/usr/bin/env bash

echo "Start building Service Auth docker image"
npm run --prefix ./service-auth docker:build

echo "Start building Service Task docker image"
npm run --prefix ./service-task docker:build

echo "Start building Web App docker image"
npm run --prefix ./web-app docker:build
