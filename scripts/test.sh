#!/usr/bin/env bash

npm --prefix ./service-auth test &&
npm --prefix ./service-task test &&
npm --prefix ./web-app test
