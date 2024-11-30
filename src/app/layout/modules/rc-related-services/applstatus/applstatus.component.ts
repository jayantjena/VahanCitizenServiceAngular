
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ApplstatusserviceService } from './applstatusservice.service';


@Component({
  selector: 'app-applstatus',
  templateUrl: './applstatus.component.html',
  styleUrls: ['./applstatus.component.css']
})
export class ApplstatusComponent implements OnInit {

  applNo: String = "";
  getapplstatusList: any;
  renderApplstatus: boolean = false;
  disableTextBox:boolean;
  oldData:any;
  getdata1:any;
  errormsg:any;
  
  constructor(private router: Router, private applstatusservice: ApplstatusserviceService) { }

  ngOnInit() {
  }

  reset()
  {
    this.renderApplstatus=false;
    this.disableTextBox=false;
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



  // submit for application status method start
  onSubmit() {
    if (this.applNo != null && this.applNo != " ") {
      this.applstatusservice.getApplNo(this.applNo).subscribe({next:(states: any[]) => {
          this.getapplstatusList = states;
          this.renderApplstatus = true;
          this.disableTextBox=true;
          // console.log(this.getapplstatusList);
        },
        error:err => {
        // this. errormsg=err.errorDesc;
         this.errormsg = err.json().errorDesc;

          // console.log(err);
        }}
      );
    }
    // console.log(form.value);
  }
  // submit for application status method end  


  getdata(data:any){
    this.getdata1=data;
  this.applstatusservice.getOldStatus(data.appl_no,data.regno,data.curr_off_cd,data.purCd,data.vh_class).subscribe({next:(states:any[]) => {
        this.oldData = states;
        this.getdata1=data;
        console.log(JSON.stringify(this.oldData));
      //  this.renderApplstatus = true;
       // this.disableTextBox=true;
        // console.log(this.getapplstatusList);
      },
      error:err => {
        // console.log(err);
      }}
    );

  }
}
