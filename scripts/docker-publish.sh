#!/usr/bin/env bash

npm run --prefix ./service-auth docker:publish && npm run --prefix ./service-task docker:publish
