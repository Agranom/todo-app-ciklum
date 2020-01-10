#!/usr/bin/env bash

echo "Start linting Service Auth"
npm run --prefix ./service-auth lint

echo "Start linting Service Task"
npm run --prefix ./service-task lint

echo "Start linting Web App"
npm run --prefix ./web-app lint
