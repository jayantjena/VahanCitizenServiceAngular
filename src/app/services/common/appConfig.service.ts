import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; 
import { LoggerService } from './logger.service'; 
import { GlobalConstants } from 'src/app/globalConstants.class';


@Injectable()
export class AppConfigService {
  appConfig: any = {};
  prefix: string = "assets/i18n/config/";
  suffix: string = ".json";
  configNamePrefix:string=GlobalConstants.appPrefix;
  orgPrefix:string='org';


  constructor(private _http: HttpClient,   
    private _loggerService: LoggerService,) { }

  setAppConfig(path: string): Promise<{}> {
    debugger
    return new Promise<{}>((resolve, reject) => {
      let appConfigPath = "";
      appConfigPath = `${this.prefix}${path}${this.suffix}`;
      const httpOptions = { headers: new HttpHeaders().set('requestType', "local") };
      this._http.get<{}>(appConfigPath, httpOptions).subscribe(
       {next: translation => {
        //  console.log(translation);
        let previousConfig = this.getAppConfigFromLocal(this.configNamePrefix +'appConfigFile');
        if (previousConfig != "") {
          this.appConfig = Object.assign(JSON.parse(this.getAppConfigFromLocal(this.configNamePrefix +'appConfigFile')), translation);
        } else {
            this.appConfig = Object.assign({}, translation || {});
          }
         
          this.saveAppConfigInLocal(this.configNamePrefix +"appConfigFile", JSON.stringify(this.appConfig));
          this.setLoggerFlags(JSON.stringify(this.appConfig));
          let appConfigPath = this.getAppConfig('ApiSecurityURL');
         },
        error:error => {
          console.log("appConfig was not loaded");
          this.appConfig = {};
          resolve(this.appConfig);
        }},
        
      );
    });
  }

  getAppConfig(key: string): string {
    debugger
    var appConfigData = this.getAppConfigFromLocal(this.configNamePrefix +"appConfigFile");
    if (appConfigData === undefined || appConfigData === null || appConfigData == "") {
      console.log(this.configNamePrefix +"appConfig was not found");
      resource = null;
      return key;
    }
    var appConfigDataJson = JSON.parse(appConfigData);
    var resource = appConfigDataJson[key];
    if (resource == null) {
      // console.log("appConfig was not found");
      resource = null;
       
    }
    return resource;
  }

   

  getAppConfigFromLocal(key): any {
    var myStorage = window.localStorage;
    if (myStorage.getItem(key) == null || myStorage.getItem(key) == "") {
      console.log("appConfig was not found");
      return "";
    } else {
      var config = myStorage.getItem(key);
      return atob(config);
    }
  }

  updateAppConfig(key: string, value: string) {
    var appConfigData = this.getAppConfigFromLocal(this.configNamePrefix +"appConfigFile");
    var appConfigDataJson = JSON.parse(appConfigData);
    appConfigDataJson[key] = value;
    this.saveAppConfigInLocal(this.configNamePrefix +"appConfigFile", JSON.stringify(appConfigDataJson));
  }


  saveAppConfigInLocal(key, val): void {
    var myStorage = window.localStorage;
    myStorage.setItem(key, btoa(val));
  }

  // setHeaders(lang: string): any {
  //   var tenant_Id = this.getAppConfig("TenantId");
  //   var userId = "";
  //   var appId = this.getAppConfig("AppId");
  //   var lang = this.getAppConfig("Lang");
  //   var data = {
  //     Tenant_Id: tenant_Id,
  //     UserId: userId,
  //     AppId: appId,
  //     Language: lang
  //   }
  //   return data;
  // }

  //setting logger service flags in order to avoid circular dependancy
  setLoggerFlags(data) {
    let dataObj = JSON.parse(data);
    this._loggerService.baseURL = dataObj["ApiBaseURL"];

    this._loggerService.loggerSizeInMB = dataObj["LoggerSize"];

    this._loggerService.isLogToClientInfo = dataObj["isLogToClientInfo"] == null || dataObj["isLogToClientInfo"].toString().toLowerCase() == 'true' ? true : false;
    this._loggerService.isLogToServerInfo = dataObj["isLogToServerInfo"] == null || dataObj["isLogToServerInfo"].toString().toLowerCase() == 'true' ? true : false;

    this._loggerService.isLogToClientError = dataObj["isLogToClientError"] == null || dataObj["isLogToClientError"].toString().toLowerCase() == 'true' ? true : false;
    this._loggerService.isLogToServerError = dataObj["isLogToServerError"] == null || dataObj["isLogToServerError"].toString().toLowerCase() == 'true' ? true : false;

    this._loggerService.isLogToClientDebug = dataObj["isLogToClientDebug"] == null || dataObj["isLogToClientDebug"].toString().toLowerCase() == 'true' ? true : false;
    this._loggerService.isLogToServerDebug = dataObj["isLogToServerDebug"] == null || dataObj["isLogToServerDebug"].toString().toLowerCase() == 'true' ? true : false;
  }
}
