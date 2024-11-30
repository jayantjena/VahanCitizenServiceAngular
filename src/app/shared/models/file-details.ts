
export class FileDetails{
    status:string;
    fileName:string;
    filePath:string;
    
    constructor(_status: string, _fileName: string, _filePath: string) {
      this.status = _status;
      this.fileName = _fileName;
      this.filePath = _filePath;
        }
  }