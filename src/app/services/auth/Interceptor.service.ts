// //Revision History:Task ID:3913 cleared storage on token expiry instead of logput as discussed with Navin Sir
// import { Injectable } from '@angular/core';
// import { Observable, throwError } from 'rxjs';
// import { SessionService } from '../common/session.service';
// import { HttpRequest, HttpInterceptor, HttpHandler, HttpEvent, HttpErrorResponse, HttpResponse, } from '@angular/common/http';
// import { AppRequestModel } from '../../shared/models/appRequest.model';
// import { AppConfigService } from '../common/appConfig.service';
// import { UserPreferenceService } from '../common/userPreference.service';
// import { catchError, tap } from 'rxjs/operators';
// import { LoaderService } from "../common/loader.service";
// //import { LoggerService } from '../common/logger.service';

// @Injectable()
// export class AuthInterceptor implements HttpInterceptor {
//     constructor(private _sessionManager: SessionService, private _configManager: AppConfigService,
//         private _userPreferenceService: UserPreferenceService,
//         private loaderService: LoaderService
//         //private _loggerService: LoggerService
//     ) { }

//     intercept(req: HttpRequest<any>,
//         next: HttpHandler): Observable<HttpEvent<any>> {
//       let requestType = req.headers.get("requestType");
//         console.log(requestType);
//         console.log(req.url);
//         // if (this._configManager.getAppConfig('isLocalToken')) {
//         //     this._sessionManager.saveInLocal('token', this._configManager.getAppConfig('token'));
//         //     let now = new Date();
//         //     this._sessionManager.saveInLocal('expires_at', now.setSeconds(parseInt(this._configManager.getAppConfig('token_expire_at'))));
//         //     this._sessionManager.saveInLocal('UserId', this._configManager.getAppConfig('userId'));
//         //     this._sessionManager.saveInLocal('SessionId', this._configManager.getAppConfig('token_session_id'));
//         //     this._sessionManager.saveInLocal('UserCode', 'VikashMishra');
//         //     }

//         // let userId: number = 0;
//         // var appId = "0";
//         // var securityAppId=this._configManager.getAppConfig("SecurityAppId");


//         // if (this._sessionManager.getFromLocal("AppId") != ""){
//         //     appId = this._sessionManager.getFromLocal('AppId');
//         // }
//         // else {
//             // appId = this._configManager.getAppConfig('AppId');
//     //    / }

//         // if (this._sessionManager.getFromLocal("UserId") != "") {
//         //     userId = this._sessionManager.getFromLocal("UserId");
//         // }
//         // to call public/anonymous Apis only
//         if (requestType != null && requestType == 'local') {
//             //  this._loggerService.logInfo("Request intercepted to read local files from: " + req.url, "Interceptor");
//             // return next.handle(req);
//             return this.makeRequest(next, req);
//         }
//         // to call public/anonymous Apis only
//         else if (requestType != null && requestType == 'anonymous') {
//             //  this._loggerService.logInfo("Request intercepted as anonymous for api: " + req.url, "Interceptor");

//             //common request header model
//             // if(req.url.indexOf(this._configManager.getAppConfig("ApiSecurityURL"))>-1){
//             //     appId=securityAppId;
//             // }
//             // let requestModel = new AppRequestModel(userId, appId,
//             // this._userPreferenceService.getPreferenceByKey('TenantId'), false, this._sessionManager.getFromLocal('TimeZone')==""? this._configManager.getAppConfig('TimeZone'):this._sessionManager.getFromLocal('TimeZone'),
//             // this._sessionManager.getFromLocal('TimeZoneOffset'), this._configManager.getAppConfig('DateFormat'), '', '', '', '', 'VikashMishra',
//             // this._sessionManager.getFromLocal('BaseOrgCode')==""? this._configManager.getAppConfig('BaseOrgCode'):this._sessionManager.getFromLocal('BaseOrgCode'),this._sessionManager.getFromLocal('TimeFormat'));

//             const cloned = req.clone({
//                 withCredentials: true,
//                 headers: req.headers.set('Content-Type', 'application/json')
//                     .set('data', JSON.stringify(requestType))
//                     .set('Pragma', 'no-cache')
//             });
//             console.log(cloned.headers);
//             console.log("Request headers of");
//             // this._loggerService.logInfo("Request headers of cloned request in Intercepter", "Interceptor", cloned.headers);
//             // return next.handle(cloned).do((event: HttpEvent<any>) => {
//             //     if (event instanceof HttpResponse) {
//             //       // do stuff with response if you want
//             //     }
//             //   });
//             // return next.handle(cloned);
//             return this.makeRequest(next, cloned);
//         }
//         else {
//             // this._loggerService.logInfo("Request intercepted for api: " + req.url, "Interceptor");

//             const idToken = this._sessionManager.getFromLocal("token");

//             if (idToken) {
//                 // if (!this._sessionManager.isLoggedIn()) {
//                 //     const httpErrorResponse = new HttpErrorResponse({ error: 'token expired', statusText: 'token expired', status: 404 });
//                 //     //  this._loggerService.logInfo("token expired", "Interceptor");
//                 //     this._sessionManager.clearSessionStorage();
//                 //     return Observable.throw(httpErrorResponse);
//                 // }
//                 // else 
//                 {
//                     //common request header model
//                   let requestModel = new AppRequestModel(userId, appId,
//                     this._userPreferenceService.getPreferenceByKey("TenantId"), false, this._sessionManager.getFromLocal('TimeZone')==""? this._configManager.getAppConfig('TimeZone'):this._sessionManager.getFromLocal('TimeZone'),
//                     this._sessionManager.getFromLocal('TimeZoneOffset'), this._userPreferenceService.getPreferenceByKey('DateFormat'), '', '', '', '', 'VikashMishra',
//                     this._sessionManager.getFromLocal('BaseOrgCode')==""? this._configManager.getAppConfig('BaseOrgCode'):this._sessionManager.getFromLocal('BaseOrgCode'),this._userPreferenceService.getPreferenceByKey('TimeFormat'));

//                     const cloned = req.clone({
//                         withCredentials: true,
//                         headers: req.headers.set("Authorization", "Bearer " + idToken)
//                             .set('Content-Type', 'application/json')
//                             .set('data', JSON.stringify(requestModel))
//                             .set('Pragma', 'no-cache')
//                     });
//                     //  this._loggerService.logInfo("Request headers of cloned request in Intercepter", "Interceptor", cloned.headers);
//                     // return next.handle(cloned).do((event: HttpEvent<any>) => {
//                     //     if (event instanceof HttpResponse) {
//                     //       // do stuff with response if you want
//                     //     }
//                     //   });
//                     // return next.handle(cloned);
//                     return this.makeRequest(next, cloned);
//                 }
//             }
//             else {
//                 //  this._loggerService.logInfo("token not found", "Interceptor");
//                 const httpErrorResponse = new HttpErrorResponse({ error: 'token not found', statusText: 'token not found', status: 404 });
//                 //this._sessionManager.logout();
//                 // return Observable.throw(httpErrorResponse);
//                 return throwError(()=>{return  httpErrorResponse;});
//                 // let requestModel = new AppRequestModel(userId, this._configManager.getAppConfig('AppId'),
//                 // this._configManager.getAppConfig("TenantId"),false,this._sessionManager.getFromLocal('TimeZone'),
//                 // this._sessionManager.getFromLocal('TimeZoneOffset'),this._configManager.getAppConfig('DateFormat'),'','','','',"siteadmin");

//                 // const cloned = req.clone({
//                 //               withCredentials: true,
//                 //     headers: req.headers.set("Authorization", "Bearer " + idToken)
//                 //     .set('Content-Type','application/json')
//                 //     .set('data',JSON.stringify(requestModel))
//                 // });

//                 // return next.handle(cloned).do((event: HttpEvent<any>) => {
//                 //     if (event instanceof HttpResponse) {
//                 //       // do stuff with response if you want
//                 //     }
//                 //   });
//                 // return next.handle(cloned);
//             }
//         }
//     }
//     // loaderService
//     makeRequest(next: HttpHandler, req: HttpRequest<any>): Observable<any> {
//         return next.handle(req).pipe(tap((ev: HttpEvent<any>) => {
//             if (ev instanceof HttpResponse)
//                 this.loaderService.hide(10);
//             return ev;
//         }))
//             .pipe(catchError(err => {
//                 this.loaderService.hide(10);
//                 return throwError(err)
//             }))
//     }

//     // interceptResponse(req: HttpResponse<any>,
//     //     next: HttpHandler): Observable<HttpEvent<any>> {

//     //     return next.handle(req);
//     // }        
// }

