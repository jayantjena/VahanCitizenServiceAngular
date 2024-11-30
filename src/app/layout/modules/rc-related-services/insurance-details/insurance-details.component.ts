import { Component, OnInit } from '@angular/core';
import { ChangeOfAddressDto } from '../ChangeOfAddressDto';

@Component({
  selector: 'app-insurance-details',
  templateUrl: './insurance-details.component.html',
  styleUrls: ['./insurance-details.component.css']
})
export class InsuranceDetailsComponent implements OnInit {
public changeofaddressdto:ChangeOfAddressDto;
  constructor() { 
    this.changeofaddressdto = new ChangeOfAddressDto();
  }

  ngOnInit(): void {
    this.changeofaddressdto=JSON.parse(localStorage.getItem('changeofaddressdto'));
   

  }


}
