//Revision History: Task ID:3479 By BS on 20181205 issue fixed for toggle on multiple request
import { Component, OnInit } from '@angular/core';
import { ErrorHandlingService } from './errorHandling.service'; 
import { AppResponse } from '../models/appResponse';
import { AppResponseTypeEnum } from '../Enum/AppResponseType.enum'; 
import { AppConfigService } from 'src/app/services/common/appConfig.service';
import { SessionService } from 'src/app/services/common/session.service';

declare var $:any;
@Component({
  selector: 'error-handling',
  templateUrl: './errorHandling.html'
})
export class ErrorHandlingComponent implements OnInit {
  response : AppResponse;
  responseType: string;
  responseSource: string;
  responseCode: string;
  responseDescription: string="";
  showErrorPage : boolean=false;
  showSessionExpiredPage : boolean;
  responseDescriptionColor:string;
  txtRedirectLogin:string;
  capClose:string;
  capRefresh:string;
  constructor(
    private _errorHandling: ErrorHandlingService, 
    private _appConfig:AppConfigService, 
    private _sessionManager: SessionService,
    // private _resourceService :ResourceService,
     ) { }

  ngOnInit() {
    debugger
    // this.txtRedirectLogin=this._resourceService.getResource('msgLoginPageRedirect');
    // this.capClose=this._resourceService.getResource('capClose');
    // this.capRefresh=this._resourceService.getResource('capRefresh');
    this._errorHandling.currentMessage.subscribe(response => {
      this.response = response;
      this.responseType = response.responseType;
    
      
      this.responseSource = "";
      this.responseCode =  response.responseCode;
     // this.showErrorPage =  response.isError;
      this.showSessionExpiredPage = response.isSessionExpired;
      console.log(this.response);
      // if(response.responseSource != undefined && response.responseSource != ""){
      //   $('#ErrorPageModal').modal('toggle');
      // }

      if(response.isError && !response.isSessionExpired){
        
        if(response.responseType==AppResponseTypeEnum.Error){
          this.responseDescriptionColor="red";
        }else if(response.responseType==AppResponseTypeEnum.Warning){
          this.responseDescriptionColor="yellow"
        }
        else if(response.responseType==AppResponseTypeEnum.Exception){
          this.responseDescriptionColor="grey"
        }else{
          // this.responseType=this._resourceService.getResource('ttlAlert');
        }
    
        if(!$('#ErrorPageModal').hasClass('in') && !this.showErrorPage){
          this.showErrorPage=true;
            if(response.response !==undefined){
              if(response.response.error !== undefined && response.response.error !== null){
                if(response.response.error.response !== undefined && response.response.error.response !== null){
                    this.responseDescription =response.response.message+ ' : ' + response.response.error.response.message.toString();
                }else{
                  this.responseDescription =response.response.message
                }
              }
             else if(response.response.message !== undefined && response.response.message !== null){
                this.responseDescription = response.response.message.toString();
              }
              else{
                this.responseDescription = response.response.toString();
              }
            }
          
          $('#ErrorPageModal').modal('show');
          // $('#ErrorPageModal').modal('toggle');
         // $('#ErrorPageModal').css('display', 'block')
        }else{
          if(response.response !==undefined){
            if(response.response.message !== undefined && response.response.message !== null){
              this.responseDescription =this.responseDescription +" <br> "+ response.response.message.toString();
            }
            else{
              this.responseDescription = this.responseDescription +" <br> "+ response.response.toString();
            }
          }
        }
      }else if(response.isSessionExpired){
        this.showErrorPage=true;
        if(response.response.message !== undefined && response.response.message !== null){
          this.responseDescription =response.response.message.toString();
        }
        else{
          this.responseDescription = response.response.toString();
        }
        // this.responseType=this._resourceService.getResource("ttlSessionExpired");
        // this.responseDescription=this._resourceService.getResource("msgSessionExpired");
        $('#ErrorPageModal').modal({
          backdrop: 'static',
          keyboard: false
        });
      }
    });
  }

  closeErrorPage(){
    this.showErrorPage =  false;
    $('#ErrorPageModal').modal('hide');
    // $('#ErrorPageModal').modal('toggle');
    // if(this.showSessionExpiredPage){
    //   this._sessionManager.logout();
    // }
  }

  logout(){
    this._sessionManager.logout();
    //this._router.navigate(["/login"]);
    window.location.href = this._appConfig.getAppConfig("UISecurityURL");
  }
  
  refresh() {
    this.showErrorPage =  false;
    window.location.href = this._appConfig.getAppConfig("UISecurityURL");
  }
}
