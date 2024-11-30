import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-failed-pending-transaction',
  templateUrl: './failed-pending-transaction.component.html',
  styleUrls: ['./failed-pending-transaction.component.css']
})
export class FailedPendingTransactionComponent implements OnInit {
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
  constructor(private router:Router) { }

  ngOnInit(): void {
  }
  redirectHome() {
    this.router.navigate(['']);
  }

}
