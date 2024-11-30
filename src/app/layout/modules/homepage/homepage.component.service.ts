import { Injectable } from '@angular/core';
import { AppConfigService } from '../services/common/appConfig.service';
import { ResourceService } from '../services/common/resource.service';
import { BeforeLoginResource } from './model/before-login-resources.class';

@Injectable({
  providedIn: 'root'
})
export class HomePageResourceService {
  resourceObj: BeforeLoginResource = new BeforeLoginResource();
   
  constructor( private _appConfig: AppConfigService,
    private _resourceService: ResourceService) { }

   // Set resources function -->>
   public getGenericResources() {
    for (const resource of Object.keys(this.resourceObj)) {
      this.resourceObj[resource] = (this._resourceService.getResource(resource) === resource) ?
        this.resourceObj[resource] : this._resourceService.getResource(resource);
    }
    return this.resourceObj;
  }

  /// function to show toasters
  public showToaster(successFlag: boolean, 
    messageString: string, 
    infoFlag: boolean = false, 
    isManualClose?: boolean) {
    const msgData = {
      isSuccess: successFlag,
      isError: !successFlag && !infoFlag,
      isInfo: infoFlag,
      successTosterTime: this._appConfig.getAppConfig('ToasterSuccess'),
      errorTosterTime: this._appConfig.getAppConfig('ToasterError'),
      infoTosterTime: this._appConfig.getAppConfig('ToasterInfo'),
      message: this._resourceService.getResource(messageString),
      isManualClose: isManualClose
    };
    // this._toasterService.getToasterData(msgData);
  }

  public hideToaster() {
    const msgData = {
      isSuccess: false,
      isError: false,
      isInfo: false
    };
    // this._toasterService.getToasterData(msgData);
  }

}
