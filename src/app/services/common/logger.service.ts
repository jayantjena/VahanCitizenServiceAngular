//Created By : Bhupendra Singh
//Purpose : To log information/error to object or console (configurable)
//Revision History: Task ID:3527 changes in structure flow of service
import { Injectable } from '@angular/core';
import { LoggerMessage } from '../../shared/models/loggerMessage.model';
import { AuthService } from '../auth/auth.service';
import { AppResponse } from 'src/app/shared/models/appResponse';
import { AppResponseTypeEnum } from 'src/app/shared/Enum/AppResponseType.enum';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { ErrorHandlingService } from 'src/app/shared/errorHandling/errorHandling.service';
import { Observable, throwError } from 'rxjs';
import { FileDetails } from 'src/app/shared/models/file-details';
// import { SharedConstants } from 'src/app/shared/classes/sharedConstants.class';
// import * as CryptoTS  from '../../services/common/encryptdecrypt/crypto-ts';

@Injectable()
export class LoggerService {
    //local variables declaretion
    logApiURL:string="";
    loggerSizeInMB :any ;    
    loggerObject:Array<LoggerMessage>=[];
    baseURL: string = "";

    //flag to check info logging
    isLogToServerInfo :boolean;
    isLogToClientInfo :boolean;

    //flag to check errorlogging
    isLogToServerError :boolean;
    isLogToClientError :boolean;

    //flag to check debug logging
    isLogToServerDebug :boolean;
    isLogToClientDebug :boolean;

    isLoggingDataPost:boolean=false;
    isClientSideLogging:boolean=false;

    // encPassword: string=SharedConstants.encryptionPassword;


    constructor(
        private _http: HttpClient,
        private _errorHandling: ErrorHandlingService
        ) { 
        // this.loggerSizeInMB = this.getAppConfig("LoggerSize");

        // //flag to check info logging
        // this.isLogToServerInfo =this.getAppConfig("isLogToServerInfo").toString().toLowerCase()== 'true' ? true : false;
        // this.isLogToClientInfo=this.getAppConfig("isLogToClientInfo").toString().toLowerCase()== 'true'? true : false;

        // //flag to check error logging
        // this.isLogToServerError =this.getAppConfig("isLogToServerError")== 'true' ? true : false;
        // this.isLogToClientError=this.getAppConfig("isLogToClientError")== 'true' ? true : false;

        // //flag to check debug logging
        // this.isLogToServerDebug =this.getAppConfig("isLogToServerDebug")== 'true' ? true : false;
        // this.isLogToClientDebug=this.getAppConfig("isLogToClientDebug")== 'true' ? true : false;
            // try{
            //     this.isLoggingDataPost=this.getAppConfig("isLoggingDataPost").toString().toLowerCase()== 'true' ? true : false;
            //     this.isClientSideLogging=this.getAppConfig("isClientSideLogging").toString().toLowerCase()== 'true' ? true : false;
            //     this.logApiURL=this.getAppConfig("logApiURL").toString().toLowerCase();
            // }
            // catch(e){
            //     this.isLoggingDataPost=false;
            //     this.isClientSideLogging=false;
            // }


    }

    //function to log info
    logInfo(msg:string,source:string,obj?:object){
        if(this.isClientSideLogging){      
            this.checkForLogSize();
            let infoData= new LoggerMessage(msg,source,obj,this.getCurrentDateTime());
            if(this.isLogToClientInfo){
                this.writeToConsole(infoData);
            }
            if(this.isLogToServerInfo){
                this.writeToObject(infoData);
            }
        }
    }

    //function to log error
    logError(msg:string,source:string,obj?:object){
        if(this.isClientSideLogging){     
            this.checkForLogSize();
            let errorData= new LoggerMessage(msg,source,obj,this.getCurrentDateTime());
            if(this.isLogToClientError){
                this.writeToConsole(errorData);
            }
            if(this.isLogToServerError){
                this.writeToObject(errorData);
            }
        }
    }

    //function to log debug 
    logDebug(msg:string,source:string,obj?:object){
        if(this.isClientSideLogging){     
            this.checkForLogSize();
            let debugData= new LoggerMessage(msg,source,obj,this.getCurrentDateTime());
            if(this.isLogToClientDebug){
                this.writeToConsole(debugData);
            }
            if(this.isLogToServerDebug){
                this.writeToObject(debugData);
            }
         }
    }

    //function to log data to console
    writeToConsole(data:any){
        console.log(data);
    }

    //function to log data to object
    writeToObject(data:LoggerMessage){
        this.loggerObject.push(data);
      //  this.loggerObject=this.loggerObject + "|~|" + logData;
    }

    //function to check local object size if size exceeds it will call api to send logdata
    checkForLogSize(){
        if(this.isLoggingDataPost){
            if (this.loggerSizeInMB <= this.getLocalSize()) {
                console.log('logger size limit exceeded');
                let loggerDataObject=this.loggerObject;
                this.loggerObject=[];
                this.sendLogDataToServer(JSON.stringify(loggerDataObject))
                .subscribe((resp: AppResponse) => {
                    if(resp.responseType==AppResponseTypeEnum.Success){
                        console.log("Log data sent to server");
                        this.loggerObject=[];
                    }else{
                        console.log("Error occured while sending log data to server");
                        console.log(resp.response);
                    }
                });
            }
        }
    }   

    //function to calculate local object size 
    getLocalSize(): number {
        if (this.loggerObject!=undefined && this.loggerObject!==null) {
           var size = (JSON.stringify(this.loggerObject).length * 2) / 1024 / 1024;
           console.log("Logger Size = " + size + " MB");
           return size;
           }
           else{
               return 0;
            }

    }

    //function to call api 
    sendLogDataToServer(data:string){
        // return this._authService.callPostApi(this.logApiURL,null,data,"");
        try {
            // this._loggerService.logInfo('Start Calling POST',"Auth Service");
            let requestUrl = this.baseURL + this.logApiURL;
		    let requestHeader = new HttpHeaders();
            // if (requestHeaderData != ""){
            //     this.requestHeader = this.requestHeader.set('data',requestHeaderData);
            // }
            // if (requestHeaderData != null && requestHeaderData.length > 0) {
            //     for (let i = 0; i < requestHeaderData.length; i++) {
            //         this.requestHeader = this.requestHeader.set(requestHeaderData[i].Key, JSON.stringify(requestHeaderData[i].Value));
            //     }
            // }

            // if (Mode == "anonymous"){
            //     this.requestHeader = this.requestHeader.set('requestType',"anonymous");
            // }

            const httpOptions = { headers: requestHeader };

            return this._http.post(requestUrl, data, httpOptions).pipe(map((res: AppResponse) => {
              //  this._loggerService.logInfo("POST response:","Auth Service",res);
                let response = this.requestProcessing(res);
                return response;
            }), catchError(res => {
                let response = this.processhttpHandleError(res);
                // return Observable.throw(response.error);
                return throwError(()=>{ return  response.error; })
            })
            );
        }
        catch(e){
            return new Observable<any>(e.Message)
        }
    }

    getCurrentDateTime(){
        var today = new Date();
        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date+' '+time;
        return dateTime;
    }

    
    // //appconfig service function added to avoid circular dependancy
    getAppConfig(key: string): string {
        debugger
        var appConfigData = this.getAppConfigFromLocal("appConfigFile");
        if(appConfigData === undefined || appConfigData === null || appConfigData == ""){
          console.log("appConfig was not found");
          resource = "";
          return;
        }
        var appConfigDataJson = JSON.parse(appConfigData);
        var resource = appConfigDataJson[key];
        if (resource == null) {
          console.log("appConfig was not found");
          resource = "";
        }
        return resource;
      }
      
    // //appconfig service function added to avoid circular dependancy
    getAppConfigFromLocal(key): any {
        var myStorage = window.localStorage;
        if (myStorage.getItem(key) == null || myStorage.getItem(key) == "") {
          console.log("appConfig was not found");
          return "";
        } else {
          var config = myStorage.getItem(key);
        //   return CryptoTS.AES.decrypt(config, this.encPassword).toString(CryptoTS.enc.Utf8);
          return atob(config);
        }
    }
      
      requestProcessing(response: AppResponse): AppResponse {
        if (response.responseType == AppResponseTypeEnum.Success) {
            if (response.response != null) {
                let responseObj = response.response;
                if (responseObj.message !== undefined && responseObj.message !== null) {

                    //this._messageService.displayMessage(this._resourceService.getResource(responseObj.message));
                }
            }
        }
        else if (response.responseType == AppResponseTypeEnum.Information) {
            if (response.response != null) {
                let responseObj = response.response;
                if (responseObj.message !== undefined && responseObj.message !== null) {
                    //this._messageService.displayMessage(this._resourceService.getResource(responseObj.message));
                }
            }
        }
        else if (response.responseType == AppResponseTypeEnum.Warning) {
            if (response.response != null) {
                let responseObj = response.response;
                if (responseObj.message !== undefined && responseObj.message !== null) {
                    this.processHandledError(response);
                }
            }
        }
        else if (response.responseType == AppResponseTypeEnum.Error) {
            if (response.response != null) {
                let responseObj = response.response;
                if (responseObj.message !== undefined && responseObj.message !== null) {
                    this.processHandledError(response);
                }
            }
        }
        else if (response.responseType == AppResponseTypeEnum.Confirm) {
            if (response.response != null) {
                let responseObj = response.response;
                if (responseObj.message !== undefined && responseObj.message !== null) {
                   // this._messageService.displayMessage(this._resourceService.getResource(responseObj.message));
                }
            }
        }
        else if (response.responseType == AppResponseTypeEnum.File) {
            if (response.response != null) {

                let filePath: Array<FileDetails> = [];

                response.response.forEach(item => {
                    if (item != "") {
                        filePath.push(new FileDetails(item.status, item.fileName, item.filePath));
                    }
                });

                filePath.forEach(item => {
                    if (item.filePath != "") {
                        window.open(item.filePath);
                    }
                });

                let responseObj = response.response;
                if (responseObj.message !== undefined && responseObj.message !== null) {
                  //  this._messageService.displayMessage(this._resourceService.getResource(responseObj.message));
                }

            }
        }
        else if (response.responseType == AppResponseTypeEnum.Exception) {
            if (response.response != null) {
                let responseObj = response.response;
                if (responseObj.message !== undefined && responseObj.message !== null) {
                    response.isError = true;
                    this.processHandledError(response);
                }
            }
        }
        else {
            response.isError = true;
            this._errorHandling.changeMessage(response);
        }
        return response;
    }

    private processhttpHandleError(response: HttpErrorResponse): HttpErrorResponse {

        if (response != null && (response.error == 'token not found' || response.error == 'token expired')) {
            var responseObj = new AppResponse(response.status.toString(), response, response.error, "", "", false, true);
            this._errorHandling.changeMessage(responseObj);
            return response;
        }
        else if (response.statusText != null && response.statusText == "Unauthorized") {
            //this._sessionManager.logout();
            return response;
        }
        else {
            var responseObj = new AppResponse(response.status.toString(), response, response.message, "", "", true);
            this._errorHandling.changeMessage(responseObj);
            return response;
        }
    }

    private processHandledError(response: AppResponse): AppResponse {
        this._errorHandling.changeMessage(response);
        return response;
    }
}