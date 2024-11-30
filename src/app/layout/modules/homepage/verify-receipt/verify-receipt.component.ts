import { VerifyReceiptService } from './verify-receipt.service';
import { Router } from '@angular/router';
import { Component, Input, OnInit, Output } from '@angular/core';
  

@Component({
  selector: 'app-verify-receipt',
  templateUrl: './verify-receipt.component.html',
  styleUrls: ['./verify-receipt.component.css']
})
export class VerifyReceiptComponent implements OnInit {
  regn_no:String="";
  receipt_no:String="";
  renderRectDtls:boolean=false;
  disableTextBox:boolean;
  verifyDetails:any=[];
  vrltd:VerifyDetailsInterface;
  public isHomePageDisplay:boolean = false;
  
  constructor(private router: Router, 
    private rcptDetail:VerifyReceiptService) { }

  ngOnInit() {
    
  }
   
  // space not allowed method start
  spaceNotAllowed(event): any {
    const charCode = (event.which) ? event.which : event.keycode;
    if (charCode < 48) {
      return false;
    }
    return true;
  }
  // space not allowed method end

  // redirect to home method start
  redirectHome() {
    this.router.navigate(['']);    
  }
 // redirect to home method end
 reset()
 {
   this.renderRectDtls=false;
   this.disableTextBox=false;
 }
  // submit for application status method start
  onSubmit() {
    debugger
    if (this.regn_no != null || this.regn_no != " ") {
      this.rcptDetail.getRegnRcpt(this.receipt_no, this.regn_no)
      .subscribe({next:(states:any[])=> {
        this.verifyDetails = states;
        // this.verifyDetails.map(m=>{
        //   const vrtdDtls:VerifyDetailsInterface = {
        //     off_cd:m.off_cd,
        //     off_name:m.off_name,
        //     descr:m.descr,
        //     rcpt_dt:m.rcpt_dt,
        //     owner_name:m.owner_name,
        //     f_name:m.f_name,
        //     fit_upto:m.fit_upto,
        //     purdescr:m.purdescr,
        //     amount:m.amount,
        //     fine:m.fine
        //   }
          // })
           
          this.renderRectDtls = true;
          this.disableTextBox=true;
          // console.log(this.verifyDetails);
        },
       error: err => {
          // console.log(err);
        }}
      );
    }
    // console.log(form.value);
  }
  // submit for application status method end

}

export interface VerifyDetailsInterface{
  off_cd:string;
  off_name:string;
  descr:string;
  rcpt_dt:string,
  owner_name:string,
  f_name:string,
  fit_upto:string,
  purdescr:string,
  amount:number,
  fine:number
}
