import { google } from 'googleapis';
import fs from 'fs';
import { StorageService } from './storageService';

export class GoogleDriveService extends StorageService {
  private drive;

  constructor() {
    super();
    const auth = new google.auth.GoogleAuth({
      keyFile: './credentials.json',
      scopes: ['https://www.googleapis.com/auth/drive'],
    });
    this.drive = google.drive({ version: 'v3', auth });
  }

  async listFiles(query: string): Promise<{ id: string, name: string, md5Checksum: string }[]> {
    const listResponse = await this.drive.files.list({
      q: query,
      fields: 'files(id, name, md5Checksum)',
    });

    return listResponse.data.files?.map(file => ({
      id: file.id!,
      name: file.name!,
      md5Checksum: file.md5Checksum!,
    })) || [];
  }

  async updateFile(fileId: string, newFileName: string, filePath: string): Promise<void> {
    await this.drive.files.update({
      fileId: fileId,
      requestBody: {
        name: newFileName,
      },
      media: {
        mimeType: 'application/json',
        body: fs.createReadStream(filePath),
      },
    });
  }

  async createFile(fileName: string, filePath: string): Promise<string> {
    const fileMetadata = {
      name: fileName,
      parents: [process.env.GOOGLE_DRIVE_FOLDER_ID!],
    };
    const media = {
      mimeType: 'application/json',
      body: fs.createReadStream(filePath),
    };

    const response = await this.drive.files.create({
      requestBody: fileMetadata,
      media: media,
      fields: 'id',
    });

    return response.data.id!;
  }
}
