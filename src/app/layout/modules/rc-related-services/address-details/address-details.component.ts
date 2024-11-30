import { Component, OnInit } from '@angular/core';
import { Form } from '@angular/forms';
  
import { ChangeOfAddressDto } from '../ChangeOfAddressDto';
import { CommonService } from 'src/app/services/common/common.service';

@Component({
  selector: 'app-address-details',
  templateUrl: './address-details.component.html',
  styleUrls: ['./address-details.component.css']
})
export class AddressDetailsComponent implements OnInit {
  public changeofaddressdto:ChangeOfAddressDto;
  stateList: any;
  districtList:any;
  c_add1:string='';
  c_state: String = '';
  c_district: String = '';
  p_state: String = '';
  p_district: String = '';
  allComplete: boolean = false;
  addressDetailForm:Form;
  objAdd={}

  constructor(private commonservice: CommonService) { 
    this.changeofaddressdto = new ChangeOfAddressDto();
    //this.changeofaddressdto=JSON.parse(localStorage.getItem('changeofaddressdto'));
    // this.changeofaddressdto.c_add1=this.addressDetailForm.
  }
 
getAddressDetails(){
  this.changeofaddressdto.c_add1 
}
  ngOnInit(): void {
    console.log("addres deatils form "+this.addressDetailForm);
    
    this.getAllStateList();
    //this.changeofaddressdto=JSON.parse(localStorage.getItem('changeofaddressdto'));
  }
  sameAsCurrentAddress(val){
      
     this.c_add1=val;
   
  }

  getAllStateList() {
    this.commonservice.getAllStateList().subscribe({next:(states: any[]) => {
      this.stateList = states;
    },
      error:err => {
        console.log(err);
      }}
    );
  }

  getOfficeListByStateCode(stateCode: any) {
    this.commonservice.getOfficeListByStateCode(stateCode).subscribe({next:(district: any[]) => {
      this.districtList = district;
    },
      error:err => {
        console.log(err);
      }});
  }

}
