export abstract class StorageService {
    abstract listFiles(query: string): Promise<{ id: string, name: string, md5Checksum: string }[]>;
    abstract updateFile(fileId: string, newFileName: string, filePath: string): Promise<void>;
    abstract createFile(fileName: string, filePath: string): Promise<string>;
}
  