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
    this.awsBucket = new AWS.S3({
      params: {
        Bucket: process.env.AWS_ASSETS_BUCKET_NAME,
      },
    });
  }

  /**
   * Upload file to S3 bucket
   *
   * @param image {File}
   * @return {Promise<*>}
   */
  uploadImageToAwsBucket(image) {
    try {
      const buffer = Buffer.from(image.fileContent.replace(/^data:image\/\w+;base64,/, ''), 'base64');
      const bucketParams = {
        Key: `images/${image.fileName}`,
        Body: buffer,
        ACL: 'public-read',
        ContentEncoding: 'base64',
        ContentType: image.fileType,
      };

      return this.awsBucket.upload(bucketParams).promise();
    } catch (e) {
      return e;
    }
  }
}
