#!/usr/bin/env bash

echo "Start publishing Service Auth docker image"
npm run --prefix ./service-auth docker:publish

echo "Start publishing Service Task docker image"
npm run --prefix ./service-task docker:publish

echo "Start publishing Web App docker image"
npm run --prefix ./web-app docker:publish
