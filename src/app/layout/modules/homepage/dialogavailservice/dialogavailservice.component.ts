import { Component } from '@angular/core'; 
import { Router } from '@angular/router';

declare var $:any;

@Component({
  selector: 'app-dialogavailservice',
  templateUrl: './dialogavailservice.component.html',
  styleUrls: ['./dialogavailservice.component.css']
})
export class DialogavailserviceComponent {
  private isServiceList: boolean = false;
  constructor(private router: Router) { }
  getAuthenticate() {
    this.isServiceList = true;
    if (this.isServiceList) {
       this.router.navigate(['/vs/online-service-list']);
      }
  }
}
