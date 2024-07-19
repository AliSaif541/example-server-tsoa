import { execSync } from 'child_process';
import crypto from 'crypto';
import fs from 'fs';
import fsp from 'fs/promises';
import dotenv from 'dotenv';
import { UploadProcess } from './uploadProcess';
import { StorageService } from '../services/storageService';

dotenv.config();

export class SchemaUploadProcess extends UploadProcess {
  constructor(storageService: StorageService) {
    super(storageService);
  }

  private async getFileChecksum(filePath: string): Promise<string> {
    const fileBuffer = await fsp.readFile(filePath);
    const hash = crypto.createHash('md5');
    hash.update(fileBuffer);
    return hash.digest('hex');
  }

  async uploadFile(): Promise<void> {
    const branchName = execSync('git rev-parse --abbrev-ref HEAD').toString().trim();
    const localFilePath = 'http/output/swagger.json';

    try {
      const files = await this.storageService.listFiles(`name contains '${branchName}-' and trashed=false`);

      if (files.length > 0) {
        const { id: remoteFileId, name: remoteFileName, md5Checksum: remoteFileChecksum } = files[0];
        const localFileChecksum = await this.getFileChecksum(localFilePath);

        if (localFileChecksum === remoteFileChecksum) {
          console.log(`File ${remoteFileName} is the same as the local file. Skipping upload.`);
          return;
        }

        const newFileName = `schema-${branchName}-${localFileChecksum}.json`;

        await this.storageService.updateFile(remoteFileId, newFileName, localFilePath);
        console.log('Updated file with Id:', remoteFileId);
      } else {
        const fileName = `schema-${branchName}-${localFileChecksum}.json`;

        const fileId = await this.storageService.createFile(fileName, localFilePath);
        console.log('Uploaded new file with Id:', fileId);
      }

    } catch (error) {
      console.error('Error:', error);
    }
  }
}
