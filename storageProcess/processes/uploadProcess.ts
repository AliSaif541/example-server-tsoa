import { StorageService } from '../services/storageService';

export abstract class UploadProcess {
  protected storageService: StorageService;

  constructor(storageService: StorageService) {
    this.storageService = storageService;
  }

  abstract uploadFile(): Promise<void>;
}
