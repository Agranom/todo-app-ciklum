#!/usr/bin/env bash

npm run --prefix ./service-auth docker:build &&
npm run --prefix ./service-task docker:build &&
npm run --prefix ./web-app docker:build
