import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionExpireResources } from './session-expire.model';

@Component({
  selector: 'app-session-expire',
  templateUrl: './session-expire.component.html',
  styleUrls: ['./session-expire.component.css']
})
export class SessionExpireComponent implements OnInit {
  public resourceObj:SessionExpireResources=new SessionExpireResources();
   
  setNavBackground() {
    let styles = {
      'background': '#037188',
      'background-image': 'url("../../assets/img/homepage-images/flag-mark.png"), linear-gradient(180deg, #79b3f1, #037188)',
      'background-repeat': 'no-repeat',
      'background-position': 'right',
      'background-size': 'contain',
    };
    return styles;
  }
  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  redirectHome() {
    this.router.navigate(['']);
  }

}
