import { GoogleDriveService } from './services/googleDriveService';
import { SchemaUploadProcess } from './processes/schemaUpload';

async function implementingUpload() {
    const storageService = new GoogleDriveService();
    const uploadProcess = new SchemaUploadProcess(storageService);
  
    await uploadProcess.uploadFile();
}
  
implementingUpload();  