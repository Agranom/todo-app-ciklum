#!/usr/bin/env bash

npm run --prefix ./service-auth deploy &&
npm run --prefix ./service-task deploy &&
npm run --prefix ./web-app deploy
