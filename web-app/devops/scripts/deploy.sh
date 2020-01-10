#!/bin/bash

set -e

appName="Todo Web App"
envName="TodoWebApp-env"
versionLabel="v$TRAVIS_BUILD_NUMBER"
s3Path="web-app/$versionLabel/"
s3Key="$s3Path$FILE"

echo "Application ${appName} is deploying"

# Add version
sed -i "s/VERSION/$TRAVIS_BUILD_NUMBER/" $FILE

# Add the Dockerrun to S3 so that beanstalk can access it
aws s3 cp $FILE s3://$AWS_BUCKET_NAME/$s3Path

# Create new version
aws elasticbeanstalk create-application-version \
    --application-name "$appName" \
    --version-label "$versionLabel" \
    --source-bundle "{\"S3Bucket\":\"$AWS_BUCKET_NAME\",\"S3Key\":\"$s3Key\"}"

# Deploy to env
aws elasticbeanstalk update-environment \
    --environment-name "$envName" \
    --version-label "$versionLabel"

echo "Application ${appName} has been deployed on environment ${envName}"
