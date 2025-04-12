import { Injectable } from '@nestjs/common';
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3';

@Injectable()
export class S3Service {
  private s3: S3Client;
  private readonly bucket = 'minimarket'; // your Supabase bucket name

  constructor() {
    this.s3 = new S3Client({
      region: process.env.S3_REGION as string,
      endpoint: process.env.S3_ENDPOINT as string,
      forcePathStyle: true,
      credentials: {
        accessKeyId: process.env.SUPABASE_ACCESS_KEY as string,
        secretAccessKey: process.env.SUPABASE_SECRET_KEY as string,
      },
    });
  }

  async uploadFile(key: string, buffer: Buffer, mimeType: string) {
    try {
      const command = new PutObjectCommand({
        Bucket: this.bucket,
        Key: key,
        Body: buffer,
        ContentType: mimeType,
      });

      await this.s3.send(command);

      return `${process.env.SUPABASE_PUBLIC_URL}/storage/v1/object/public/${this.bucket}/${key}`;
    } catch (error) {
      console.error('Error uploading file to S3:', error);
      throw new Error('Failed to upload file');
    }
  }

  async deleteFile(filePath: string): Promise<void> {
    const bucketName = process.env.SUPABASE_BUCKET;

    const command = new DeleteObjectCommand({
      Bucket: bucketName,
      Key: filePath,
    });

    try {
      await this.s3.send(command);
      console.log(`Deleted file: ${filePath}`);
    } catch (error) {
      console.error('Error deleting file:', error);
      throw new Error('Failed to delete file');
    }
  }
}
