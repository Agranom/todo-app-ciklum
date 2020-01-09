#!/bin/bash

set -e

versionLabel="v$VERSION"
s3Path="service-auth/$VERSION/"
s3Key="$s3Path$VERSION"

# Add version
sed -i "s/VERSION/$VERSION/" $FILE

# Add the Dockerrun to S3 so that beanstalk can access it
aws s3 cp $FILE s3://$AWS_BUCKET_NAME/$s3Path

aws elasticbeanstalk create-application-version \
    --application-name service-auth \
    --version-label "$versionLabel" \
    --source-bundle "{\"S3Bucket\":\"$AWS_BUCKET_NAME\",\"S3Key\":\"$s3Key\"}"

aws elasticbeanstalk update-environment \
    --environment-name "ServiceAuth-env-1" \
    --version-label "$versionLabel"
