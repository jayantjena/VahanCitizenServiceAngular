import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ChkpentransserviceService } from './chkpentransservice.service';


@Component({
  selector: 'app-checkpentrans',
  templateUrl: './checkpentrans.component.html',
  styleUrls: ['./checkpentrans.component.css']
})
export class CheckpentransComponent implements OnInit {
  transaction_No: String;
  reg_No: String;
  chasi_No: String;
  myApplication: String = 'trangNoWise';
  chkpentransList: any;
  msg: String = '';
  taxBreakUp: any;
  renderFeeTable: boolean = false;
  renderTaxTable: boolean = false;
  renderChckBtn: boolean = false;
  taxbreakupList: any[];
  constructor(public formbuilder: FormBuilder, private chkpentransserviceService: ChkpentransserviceService) { }
  checkPndngForm: FormGroup;

   
  ngOnInit() {
    this.checkPndngForm = this.formbuilder.group({
      reg_No: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      chasi_No: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(5),
      Validators.pattern("^[0-9]*$")]],
      transaction_No: ['', [Validators.required]]
    });
  }
spaceNotAllowed(event):any
{
  const charCode = (event.which) ? event.which : event.keycode;
    if (charCode < 48) {
      return false;
    }
    return true;
}
  onlyNumeric(event): any {
    const charCode = (event.which) ? event.which : event.keycode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
  onChange(event) {
    console.log(event);
  }
  getListForChkPending() {
    if (this.myApplication === 'trangNoWise') {
      this.chkpentransserviceService.showDetailByTrans_No(this.transaction_No).subscribe({next:(res:any[]) => {
          this.chkpentransList = res;
          this.msg = ''
          console.log(this.chkpentransList);
        }, error:err => {
         // this.msg = err.json().errorDesc;
        }}
      );
    }
    if (this.myApplication === 'regnNoWise') {
      this.chkpentransserviceService.showDetailByReg_No(this.reg_No, this.chasi_No).subscribe({next:(res:any[]) => {
          this.chkpentransList = res;
          this.msg = ''
        }, error:err => {
      // this.msg = err.json().errorDesc;
        }}

      );

    }
  }
  getTaxBreakUp(purCD: number, transactionID: String, offCD: number, stateCD: String, regnNo: String) {
    this.chkpentransserviceService.getTaxBreakUp(purCD, transactionID, offCD, stateCD, regnNo).subscribe({next:(res:any[]) => {
        this.taxBreakUp = res;
        this.renderFeeTable = this.taxBreakUp.renderFeeTable;
        this.renderTaxTable = this.taxBreakUp.renderTaxTable;
        this.renderChckBtn = this.taxBreakUp.renderChckBtn;
        this.taxbreakupList = this.taxBreakUp.tax_pay_dobj;

        this.msg = ''
        console.log(this.taxbreakupList);
      }, error:err => {

        //this.msg = err.json().errorDesc;
      }}

    );

  }
  checkToBank(taxbreakup_list: any) {
   
    this.chkpentransserviceService.checkToBank(taxbreakup_list).subscribe(
      {next:
      value => {
        console.log('[POST] create Customer successfully', value);
      }, error:error => {
        console.log('FAIL to create Customer!');
      },
      complete:() => {
        console.log('POST Customer - now completed.');
      }});
  }
}
