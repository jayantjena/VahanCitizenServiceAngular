import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, catchError, throwError, Observable } from 'rxjs';
import { LoaderService } from '../common/loader.service';
import { AppRequestHeaderModel } from 'src/app/shared/models/appRequestHeader.model';
import { AppResponse } from 'src/app/shared/models/appResponse';
import { FileDetails } from 'src/app/shared/models/file-details';
import { AppResponseTypeEnum } from 'src/app/shared/Enum/AppResponseType.enum';
import { ErrorHandlingService } from 'src/app/shared/errorHandling/errorHandling.service';
import { LoggerService } from '../common/logger.service';
import { SessionService } from '../common/session.service';
import { MessageService } from '../common/message.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthService {
    constructor(private http: HttpClient, private _errorHandling: ErrorHandlingService, private _router: Router,
        private _loggerService: LoggerService,
        private _sessionManager: SessionService,
        private _messageService: MessageService,
        private _loaderService: LoaderService) { }


    requestHeader: HttpHeaders = new HttpHeaders();

    //common function for GET call api    
    public callGetApi(requestUrl: string, requestHeaderData: Array<AppRequestHeaderModel>, mode: string, isSecurityRequest?: boolean, hideLoader?: boolean) {
        try {
            let currentStamp = new Date();
            this._sessionManager.saveInLocal('LastApiHitTime', currentStamp.toString())
            // this._loaderService.show();
            this._loggerService.logInfo('Start Calling Get', "Auth Service", null);
            if (isSecurityRequest != undefined && isSecurityRequest == true) {
                requestUrl = environment.api_url + requestUrl;
            }
            else {
                requestUrl = environment.api_url + requestUrl;
            }

            // Build request headers
            let headers = new HttpHeaders();
            requestHeaderData?.forEach(header => {
                headers = headers.set(header.Key, JSON.stringify(header.Value));
            });

            if (mode == "anonymous") {
                this.requestHeader = this.requestHeader.set('requestType', "anonymous");
            }

            const httpOptions = { headers: this.requestHeader };
            if (!hideLoader)
                this._loaderService.show();
           
            return this.http.get(requestUrl, httpOptions).pipe(map((res: AppResponse) => {
                this._loaderService.hide(10);
                this._loggerService.logInfo("GET response:", "Auth service", res);
                let response = this.requestProcessing(res);
                console.log(response);
                return response;
            }), catchError(res => {
                this._loaderService.hide(10);
                this._loggerService.logError("GET error response:", "Auth Service", res);
                let response = this.processhttpHandleError(res);
                return throwError(() => {
                    return response.error;
                })
            })
            );
        }
        catch (e) {
            this._loaderService.hide(10);
            return new Observable<any>(e.Message)
        }
    }

    //common function for GET call api    
    public callPostApi(requestUrl: string, requestHeaderData: Array<AppRequestHeaderModel>, requestPostData: string, Mode: string, isSecurityRequest?: boolean, hideLoader?: boolean) {
        try {
            let currentStamp = new Date();
            this._sessionManager.saveInLocal('LastApiHitTime', currentStamp.toString())
            this._loggerService.logInfo('Start Calling POST', "Auth Service");
            if (isSecurityRequest != undefined && isSecurityRequest == true) {
                requestUrl = environment.api_url + requestUrl;
            }
            else {
                requestUrl = environment.api_url + requestUrl;
            }
            // Build request headers
            let headers = new HttpHeaders();
            requestHeaderData?.forEach(header => {
                headers = headers.set(header.Key, JSON.stringify(header.Value));
            });

            if (Mode == "anonymous") {
                this.requestHeader = this.requestHeader.set('requestType', "anonymous");
            }

            const httpOptions = { headers: this.requestHeader };
            if (!hideLoader)
                this._loaderService.show();
            return this.http.post(requestUrl, requestPostData, httpOptions).pipe(map((res: AppResponse) => {
                this._loaderService.hide();
                this._loggerService.logInfo("POST response:", "Auth Service", res);
                let response = this.requestProcessing(res);
                return response;
            }), catchError(res => {
                this._loaderService.hide();
                this._loggerService.logInfo("POST error response:", "Auth Service", res);
                let response = this.processhttpHandleError(res);
                return throwError(() => {
                    return response.error;
                })
            })
            );
        }
        catch (e) {
            return new Observable<any>(e.Message)
        }
    }

    requestProcessing(response: AppResponse): AppResponse {
        if (response.responseType == AppResponseTypeEnum.Success) {
            if (response.response != null) {
                let responseObj = response.response;
                if (responseObj.message !== undefined && responseObj.message !== null) {
                    this._messageService.displayMessage(responseObj.message);//need to check this line it may not be required
                    response.response.message = response.response.message;
                }

                if (response.resourceParams !== undefined && response.resourceParams !== null && response.resourceParams !== "") {
                    let paramArray = response.resourceParams.toString().split(',');
                    paramArray.forEach((param, index) => {
                        response.response.message = response.response.message.replace('{' + index + '}', ' ' + param);
                        console.log(response.response.message);
                    });
                }
            }
        }
        else if (response.responseType == AppResponseTypeEnum.Information) {
            if (response.response != null) {
                if (response.response.message !== undefined && response.response.message !== null) {
                    response.response.message = response.response.message;
                }
                if (response.resourceParams !== undefined && response.resourceParams !== null && response.resourceParams !== "") {
                    let paramArray = response.resourceParams.toString().split(',');
                    paramArray.forEach((param, index) => {
                        response.response.message = response.response.message.replace('{' + index + '}', ' ' + param);
                        console.log(response.response.message);
                    });
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
                    this._messageService.displayMessage(responseObj.message);
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
                    this._messageService.displayMessage(responseObj.message);
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
            this._loggerService.logInfo("request to process", "Auth Service");
            response.isError = true;
            this._errorHandling.changeMessage(response);
        }
        return response;
    }

    private processhttpHandleError(response: HttpErrorResponse): HttpErrorResponse {

        // if (response != null && (response.error == 'token not found' || response.error == 'token expired')) {
        //     var responseObj = new AppResponse(response.status.toString(), response, response.error, "", "", false, true);
        //     this._errorHandling.changeMessage(responseObj);
        //     return response;
        // }
        // else 
        if (response.statusText != null && response.statusText == "Unauthorized") {
            this._sessionManager.logout();
            this._router.navigate(['/vahanservice'], { skipLocationChange: true });
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