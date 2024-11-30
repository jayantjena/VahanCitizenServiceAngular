import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef } from "@angular/material/dialog";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { UserManualServiceService } from './user-manual-service.service';
import { FormGroup, FormControl, FormBuilder, Validators, NgForm } from '@angular/forms';


@Component({
  selector: 'app-user-manual',
  templateUrl: './user-manual.component.html',
  styleUrls: ['./user-manual.component.css']
})
export class UserManualComponent implements OnInit {
  state: string = '';
  srvs: string = '';
  stateList: any;
  serviceList: any;


  usermanualForm: NgForm;
  hiddenUsermanualDocList = false;
  hiddenUsrDocLstTable = false;
  documentList: any;
  docList: any;
  recordNotFound:boolean=false;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any[],
    public dialogRef: MatDialogRef<UserManualComponent>,
    private usermanualService: UserManualServiceService
  ) { }

  ngOnInit(): void {
    this.getAllStateList();
  }

  usermanualObj = {}

  onSubmitUsermanual(state: any, pur: any) {
    // console.log(this.usermanualForm.value);

    if ((state != '' && pur != '') &&
      (state != null && pur != null)) {
      this.usermanualService.onSubmitUsermanual(state, pur).subscribe({next:(flowstep: any[]) => {
        console.log(flowstep);
        this.usermanualObj = flowstep;
      },
      error:err => {
          console.log(err);
        }})
      this.hiddenUsermanualDocList = true;
    }
  }

  close() {
    this.dialogRef.close();
  }

  
  getAllStateList() {
    this.usermanualService.getAllStateList().subscribe({next:(states: any[]) => {
      this.stateList = states;
    },
    error:err => {
        console.log(err);
      }}
    );
  }

  onChangeService(stateCode: any) {
    this.usermanualService.onChangeService(stateCode).subscribe({next:(services: any[]) => {
      this.serviceList = services;
    },
    error:err => {
        console.log(err);
      }});
  }

  reset() {
    this.hiddenUsermanualDocList = false;
    this.hiddenUsrDocLstTable = false;
     
  }
  errormess:string;
  viewDocList(stateCode: String, purCode: Number) {
    this.usermanualService.viewDocList(stateCode, purCode).subscribe({next:(statesAndPursCd: any[]) => {
      this.documentList = statesAndPursCd;
      this.docList = this.documentList.documentDetailsList;
      this.hiddenUsrDocLstTable = true;
      if (this.docList == null || this.docList == "") {
        this.recordNotFound = true; 
      } 
    }, error:err => {
      console.log(err);
    }});
  }
}
