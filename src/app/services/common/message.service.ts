import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable()
export class MessageService {
  private appResponseMessage = new BehaviorSubject<string>("");
  public currentMessage = this.appResponseMessage.asObservable();

  constructor() { }

  public displayMessage(message: string) {
    this.appResponseMessage.next(message)
  }
}
