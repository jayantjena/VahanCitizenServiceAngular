import { Injectable } from '@angular/core';
import { SessionService } from '../../services/common/session.service';
import { AppConfigService } from './appConfig.service';


@Injectable({
    providedIn:'root'
})

export class UserPreferenceService {
  constructor(private _sessionManager: SessionService,private _appConfigService:AppConfigService) { }
  
  getPreferenceByKey(key:string){
      let configValue=this._appConfigService.getAppConfig(key);
      let userPreferenceValue=this._sessionManager.getFromLocal(key);
      if(userPreferenceValue!=undefined && userPreferenceValue.toString().trim()!=""){
        return userPreferenceValue;
      }
      else if(configValue!=undefined && configValue!=""){
          return configValue;
      }else{
          return "";
      }
  }
}