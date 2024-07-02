import { google } from 'googleapis';
import fs from 'fs';
import dotenv from 'dotenv';
import { execSync } from 'child_process';

dotenv.config();

async function uploadFile() {
  const branchName = execSync('git rev-parse --abbrev-ref HEAD').toString().trim();
  const fileName = `swagger-${branchName}.json`;

  const auth = new google.auth.GoogleAuth({
    keyFile: './credentials.json',
    scopes: ['https://www.googleapis.com/auth/drive'],
  });

  const drive = google.drive({ version: 'v3', auth });

  try {
    const listResponse = await drive.files.list({
      q: `name='${fileName}' and trashed=false`,
      fields: 'files(id, name)',
    });

    const files = listResponse.data.files;
    if (files.length > 0) {
      for (const file of files) {
        await drive.files.delete({ fileId: file.id });
      }
    }
  } catch (error) {
    console.error('Error searching/deleting files:', error);
    return;
  }

  const fileMetadata = {
    name: fileName,
    parents: [process.env.GOOGLE_DRIVE_FOLDER_ID],
  }; 
  const media = {
    mimeType: 'application/json',
    body: fs.createReadStream('http/output/swagger.json'),
  };

  try {
    const response = await drive.files.create({
      requestBody: fileMetadata,
      media: media,
      fields: 'id',
    });
    console.log('File Id:', response.data.id);
  } catch (error) {
    console.error('Error uploading file:', error);
  }
}

uploadFile();
