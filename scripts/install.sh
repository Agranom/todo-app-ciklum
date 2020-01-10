#!/usr/bin/env bash

echo "Installing Service Auth dependencies"
npm --prefix ./service-auth i

echo "Installing Service Task dependencies"
npm --prefix ./service-task i

echo "Installing Web App dependencies"
npm --prefix ./web-app i
