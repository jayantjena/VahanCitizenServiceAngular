import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AppResponse } from '../models/appResponse';
import { MatDialog } from '@angular/material/dialog'; 

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlingService {
  private response? : any;
  private resp =  new AppResponse("",this.response,"","","");
  private appResponseObj = new BehaviorSubject<AppResponse>(this.resp);
  public currentMessage = this.appResponseObj.asObservable();

  constructor() { }

  public changeMessage(appResponse: AppResponse) {
    this.appResponseObj.next(appResponse)
    // this.dialog.open(DialogBodyComponent)
  }
}
