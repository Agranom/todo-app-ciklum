#!/usr/bin/env bash

echo "Running tests for Service Auth"
npm --prefix ./service-auth test

echo "Running tests for Service Task"
npm --prefix ./service-task test

echo "Running tests for Web App"
npm --prefix ./web-app test
