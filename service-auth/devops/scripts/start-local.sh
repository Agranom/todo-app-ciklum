#!/usr/bin/env bash

env-cmd -f "./devops/config/local.dev.env" node ./dist/bundle.js
