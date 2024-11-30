
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
//import { Http, Response } from "@angular/http";
//import { Headers, RequestOptions } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
@Injectable({
  providedIn: 'root'
})
export class LeftsidebarserviceService {
  constructor(
    private http: HttpClient,
    private _authService: AuthService,) {
  }

  getAllStatesList(requestHeaderData: any, apiURL: string, isSecurityUrl, isLoader): Observable<any> {
    return this._authService.callGetApi(apiURL, requestHeaderData, '', isSecurityUrl, isLoader);
  }
  onChangeState(requestHeaderData: any, apiURL: string, isSecurityUrl, isLoader): Observable<any> {
    return this._authService.callGetApi(apiURL, requestHeaderData, '', isSecurityUrl, isLoader);
  }

  getServiceFromStateCdOffCd(requestHeaderData: any, apiURL: string, isSecurityUrl, isLoader) {
    return this._authService.callGetApi(apiURL, requestHeaderData, '', isSecurityUrl, isLoader);
  }
  setStateAndOffice(state_cd: string, off_cd: number) {
    sessionStorage.setItem('state_cd', state_cd);
    sessionStorage.setItem('off_cd', off_cd + '');
  }
}
