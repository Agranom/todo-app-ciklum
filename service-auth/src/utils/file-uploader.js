import AWS from 'aws-sdk';

/**
 * @typedef File
 * @property fileName {string}
 * @property fileType {string}
 * @property fileContent {string} file in base64 format
 */

export class FileUploader {
  constructor() {
    AWS.config.update({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_ASSETS_BUCKET_REGION,
    });
    this.awsBucket = new AWS.S3();
  }

  /**
   * Upload file to S3 bucket
   *
   * @param image {File}
   * @return {Promise<*>}
   */
  uploadImageToAwsBucket(image) {
    const buffer = Buffer.from(image.fileContent.replace(/^data:image\/\w+;base64,/, ''), 'base64');
    const imageName = `${Date.now()}-${image.fileName}`;
    const bucketParams = {
      Bucket: process.env.AWS_ASSETS_BUCKET_NAME,
      Key: `images/${imageName}`,
      Body: buffer,
      ACL: 'public-read',
      ContentEncoding: 'base64',
      ContentType: image.fileType,
    };

    return this.awsBucket.upload(bucketParams).promise();
  }
}
