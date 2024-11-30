import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EncryptionService } from 'src/app/services/common/encryption.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserManualServiceService {

  constructor(private http: HttpClient, private encryptionService:EncryptionService) { }

  getAllStateList() {
    return this.http.get(environment.api_url + '/getAllStateNameList');
  }
  onChangeService(state_code: String) {
    // state_code=this.encryptionService.convertText(state_code);
    return this.http.get(environment.api_url + '/getServiceList/' + state_code);
  }
  onSubmitUsermanual(state_code: String, purps_cd: Number){
    return this.http.get(environment.api_url +'/getServiceinfo/' + state_code +'/' + purps_cd )
  }
  viewDocList(state_code: String, purps_cd: Number) {
    // state_code= this.encryptionService.convertText(state_code);
    return this.http.get(environment.api_url + '/getAllDocNameList/' + state_code + '/' + purps_cd);
  }
}
