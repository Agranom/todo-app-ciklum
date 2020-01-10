#!/usr/bin/env bash

source ./devops/scripts/load-env.sh

env-cmd -f "./devops/config/local.dev.env" node ./dist/bundle.js
