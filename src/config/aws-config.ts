import { S3Client } from '@aws-sdk/client-s3';
import {
  IDRIVE_ENDPOINT,
  IDRIVE_ACCESS_KEY,
  IDRIVE_SECRET_KEY,
} from './env';

if (!IDRIVE_ACCESS_KEY || !IDRIVE_SECRET_KEY) {
  throw new Error('AWS credentials are required');
}

const s3Client = new S3Client({
  endpoint: IDRIVE_ENDPOINT,
  credentials: {
    accessKeyId: IDRIVE_ACCESS_KEY,
    secretAccessKey: IDRIVE_SECRET_KEY,
  },
  region: 'us-east-1', // Required for S3 client, but not used with IDrive
  forcePathStyle: true, // Required for IDrive
});

export default s3Client;