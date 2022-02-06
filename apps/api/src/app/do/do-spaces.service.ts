import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as AWS from 'aws-sdk';
import {
  DoSpacesServiceLib,
  UploadedMulterFileI,
} from './../../config/do-spaces.config';

// Typical nestJs service
@Injectable()
export class DoSpacesService {
  constructor(
    @Inject(DoSpacesServiceLib) private readonly s3: AWS.S3,
    private configService: ConfigService,
  ) {}

  async uploadFile(file: UploadedMulterFileI) {
    // Precaution to avoid having 2 files with the same name
    const fileName = `${Date.now()}-${file.originalname}`;

    // Return a promise that resolves only when the file upload is complete
    return new Promise((resolve, reject) => {
      this.s3.putObject(
        {
          Bucket: `tellit/${this.configService.get<string>('env')}`,
          Key: fileName,
          Body: file.buffer,
          ACL: 'public-read',
        },
        (error: AWS.AWSError) => {
          if (!error) {
            resolve(
              `https://tellit.sfo3.digitaloceanspaces.com/${this.configService.get<string>(
                'env',
              )}/${fileName}`,
            );
          } else {
            console.log(error);
            reject(
              new Error(
                `DoSpacesService_ERROR: ${
                  error.message || 'Something went wrong'
                }`,
              ),
            );
          }
        },
      );
    });
  }
}
