
export class AppResponse{
  responseType: string;
  response: any;
  responseCode: string;
  resourceString: string;
  resourceParams: string;
  isError : boolean = false;
  isSessionExpired : boolean =  false;
  
  constructor(_responseType: string, _response:any, _responseCode: string, _resourceString: string ,_resourceParams:string,  _isError : boolean = false , _isSessionExpired : boolean = false) {
    this.responseType = _responseType;
    this.response = _response;
    this.responseCode = _responseCode;
    this.resourceString = _resourceString;
    this.resourceParams=_resourceParams;
    this.isError = _isError;
    this.isSessionExpired = _isSessionExpired;
  }
}