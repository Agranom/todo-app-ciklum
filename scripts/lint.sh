#!/usr/bin/env bash

npm run --prefix ./service-auth lint &&
npm run --prefix ./service-task lint &&
npm run --prefix ./web-app lint
