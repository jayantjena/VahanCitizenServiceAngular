import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomepageService {
 
public isHomepage = new Subject();
  constructor() { 
    this.isHomepage.next(false);
  }
   
 
}
