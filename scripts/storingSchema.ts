import { google } from 'googleapis';
import fs from 'fs';
import fsp from 'fs/promises';
import crypto from 'crypto';
import dotenv from 'dotenv';
import { execSync } from 'child_process';

dotenv.config();

async function getFileChecksum(filePath: string): Promise<string> {
  try {
    const fileBuffer = await fsp.readFile(filePath);
    
    const hash = crypto.createHash('md5');
    hash.update(fileBuffer);

    return hash.digest('hex');
  } catch (error) {
    throw new Error(`Error computing checksum: ${error.message}`);
  }
}

async function uploadFile() {
  const branchName = execSync('git rev-parse --abbrev-ref HEAD').toString().trim();
  const localFilePath = 'http/output/swagger.json';

  const auth = new google.auth.GoogleAuth({
    keyFile: './credentials.json',
    scopes: ['https://www.googleapis.com/auth/drive'],
  });

  const drive = google.drive({ version: 'v3', auth });

  try {
    const listResponse = await drive.files.list({
      q: `name contains '${branchName}-' and trashed=false`,
      fields: 'files(id, name, md5Checksum)',
    });

    const files = listResponse.data.files;
    if (files.length > 0) {
      const remoteFileId = files[0].id;
      const remoteFileName = files[0].name;
      const remoteFileChecksum = files[0].md5Checksum;

      const localFileChecksum = await getFileChecksum(localFilePath);

      if (localFileChecksum === remoteFileChecksum) {
        console.log(`File ${remoteFileName} is the same as the local file. Skipping upload.`);
        return;
      }

      await drive.files.delete({ fileId: remoteFileId });
    }

    const randomHash = crypto.randomBytes(6).toString('hex');
    const fileName = `schema-${branchName}-${randomHash}.json`;

    const fileMetadata = {
      name: fileName,
      parents: [process.env.GOOGLE_DRIVE_FOLDER_ID],
    };
    const media = {
      mimeType: 'application/json',
      body: fs.createReadStream(localFilePath),
    };

    const response = await drive.files.create({
      requestBody: fileMetadata,
      media: media,
      fields: 'id',
    });
    console.log('Uploaded new file with Id:', response.data.id);

  } catch (error) {
    console.error('Error:', error);
  }
}

uploadFile();
