import { Component, Input, OnInit, Output, EventEmitter, AfterViewInit } from '@angular/core';
// import { EventEmitter } from 'node:stream';
import { ChangeOfAddressDto } from '../ChangeOfAddressDto';

@Component({
  selector: 'app-fee-panel',
  templateUrl: './fee-panel.component.html',
  styleUrls: ['./fee-panel.component.css']
})
export class FeePanelComponent implements OnInit {
public changeofaddressdto:ChangeOfAddressDto;
  @Output() childMethod = new EventEmitter();
  totalAmount:any;
  constructor() { 
    // this.changeofaddressdto = new ChangeOfAddressDto();
    
  }

  ngOnInit(): void {
    this.changeofaddressdto = JSON.parse(localStorage.getItem('changeofaddressdto'));
    this.totalAmount=this.changeofaddressdto.feesList[0].totalAmount;
    this.childMethod.emit(this.totalAmount);
    // console.log('CHECKKK :', this.changeofaddressdto);
    // console.log('CHECK :', this.changeofaddressdto.feesList[0]);
    
  //  console.log("uuuuuuuuuuuuuuuuuuu" +this.changeofaddressdto.feesList.totalAmount);
  }

//   ngAfterViewChecked() {
//     this.totalAmount=this.changeofaddressdto.feesList[0].totalAmount;
//     this.childMethod.emit(this.totalAmount);
// }
 
}
