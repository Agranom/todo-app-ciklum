#!/usr/bin/env bash

echo "Start deploying Service Auth"
npm run --prefix ./service-auth deploy

echo "Start deploying Service Task"
npm run --prefix ./service-task deploy

echo "Start deploying Web App"
npm run --prefix ./web-app deploy
