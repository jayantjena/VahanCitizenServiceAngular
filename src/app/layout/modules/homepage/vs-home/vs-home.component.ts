import { Component } from '@angular/core';

@Component({
  selector: 'app-vs-home',
  templateUrl: './vs-home.component.html',
  styleUrls: ['./vs-home.component.css']
})
export class VsHomeComponent {

  ngOnInit() {
    localStorage.removeItem('isBeforeMenuhide');
  }
}
