import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Form, FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { environment } from 'src/environments/environment';
import { ChangeOfAddressDto } from '../ChangeOfAddressDto';
import { ServiceEntryService } from '../service-user-entry-page/service-entry.service';
import { CommonService } from 'src/app/services/common/common.service';
import { CustomvalidationService } from 'src/app/services/common/customvalidation.service';
import { NextStepDto } from 'src/app/services/common/NextStepDto';

@Component({
  selector: 'app-to-ca-hp-drc-hd',
  templateUrl: './to-ca-hp-drc-hd.component.html',
  styleUrls: ['./to-ca-hp-drc-hd.component.css']
})
export class ToCaHpDrcHdComponent implements OnInit {
  public test: any;
  applenrtyfrmheader: string = "APPLICATION ENTRY FORM";
  trnsownership: boolean;
  duprcdtls: boolean;
  hyptrmdtls: boolean;
  hypadddtls: boolean;
  chngadddtls: boolean;
  addhypothecation: boolean;
  insuranceDTLS: boolean = false;
  feePNL: boolean = false;
  iconValue: any;
  splitpur_cd: any;
  insuranceFeePanelList: any;
  saveAsDraftDataList: any;
  stateList: any;
  districtList: any;
  c_add11: string = '';
  c_add22: string = '';
  c_add33: string = '';
  p_add11: string = '';
  p_add22: string = '';
  p_add33: string = '';
  c_state: String = '';
  c_pincode4: number;
  p_pincode4: number;
  c_district: String = '';
  p_state: String = '';
  p_district: String = '';
  allComplete: boolean = false;
  addressDetailForm: Form;
  stepList: NextStepDto[];
  paymentData: any;
  applData: any;
  totalAmount: any;
  submitted = false;
  checked = false;
  @ViewChild('saveDraftSuccessDialog', { static: true }) saveDraftSuccessDialog: TemplateRef<any>;
  @ViewChild('feeCollectionDtlsDialog', { static: true }) feeCollectionDtlsDialog: TemplateRef<any>;
    

  public changeofaddressdto: ChangeOfAddressDto;
  constructor(private commonservice: CommonService,
    private customValidator: CustomvalidationService,
    private router: Router, private _formBuilder: FormBuilder,
    private serviceentry: ServiceEntryService,
    public dialog: MatDialog) {
    this.changeofaddressdto = new ChangeOfAddressDto();
    // console.log("change of DTO"+ this.changeofaddressdto.regn_no);
     

  }

  ngOnInit(): void {
    //this.checkMee(this.totalAmount);
    this.checkboxEnbleDisable();
    this.getfeepanel();
    this.getAllStateList();
    // this.changeofaddressdto=JSON.parse(localStorage.getItem('changeofaddressdto'));
  }
  checkSameAddCurAdd = false;
  sameAsCurrentAddress(event: MatCheckboxChange, address: any) {
    this.checkSameAddCurAdd = true;
    if (event.checked && this.checkSameAddCurAdd) {
      this.c_add11 = address.value.c_add1;
      this.p_add11 = this.c_add11;
      this.c_add22 = address.value.c_add2;
      this.p_add22 = this.c_add22;
      this.c_add33 = address.value.c_add3;
      this.p_add33 = this.c_add33;
      this.c_state = address.value.stateID;
      this.p_state = this.c_state;

      this.c_district = address.value.districtCID;
      this.p_district = this.c_district;
      this.c_pincode4 = address.value.c_pincode;
      this.p_pincode4 = this.c_pincode4;
    } else {
      this.p_add11 = "";
      this.p_add22 = "";
      this.p_add33 = "";
      this.p_state = "";
      this.p_district = "";
      this.p_pincode4 = 0;
    }


  }

  checkboxEnbleDisable() {
    this.iconValue = localStorage.getItem("iconValue");

    for (var i = 0; i < this.iconValue.length; i++) {
      if (this.iconValue[i] == this.checkboxesList[0].name && environment.TO_PUR_CD == 5) {
        this.checkboxesList[0].disabled = false;
        if (i == 0) {
          this.checkboxesList[0].isSelected = true;
        }
        this.trnsownership = true;
        this.insuranceDTLS = true;
        this.feePNL = true;
      }
      if (this.iconValue[i] == this.checkboxesList[3].name && environment.CA_PUR_CD == 4) {
        this.checkboxesList[3].disabled = false;
        if (i == 0) {
          this.checkboxesList[3].isSelected = true;
        }
        this.chngadddtls = true;
        this.insuranceDTLS = true;
        this.feePNL = true;
      }
      if (this.iconValue[i] == this.checkboxesList[2].name && environment.DPRC_PUR_CD == 3) {
        this.checkboxesList[2].disabled = false;
        if (i == 0) {
          this.checkboxesList[2].isSelected = true;
        }
        this.chngadddtls = true;
        this.insuranceDTLS = true;
        this.feePNL = true;
      }

      if (this.iconValue[i] == this.checkboxesList[1].name && environment.HPT_PUR_CD == 7) {
        this.checkboxesList[1].disabled = false;
        if (i == 0) {
          this.checkboxesList[1].isSelected = true;
        }
        this.chngadddtls = true;
        this.insuranceDTLS = true;
        this.feePNL = true;
      }
    }
  }

  getfeepanel() {
    const state_cd = localStorage.getItem("selectedgroupState");
    const pur_cd = localStorage.getItem("pur_cd");
    const regn_no = localStorage.getItem("regn_no");
    // const off_cd= sessionStorage.getItem("off_cd")
    this.serviceentry.getfeepanel(regn_no, pur_cd, state_cd).subscribe(
      {
        next: (insuranceFeePanelList) => {
          this.insuranceFeePanelList = insuranceFeePanelList;
          //console.log(" insuuuuuuuuu rance     " + this.insuranceFeePanelList.aadhar_no);
          this.changeofaddressdto = this.insuranceFeePanelList;
          // console.log(this.changeofaddressdto);
          localStorage.setItem('changeofaddressdto', JSON.stringify(this.changeofaddressdto));
          if (this.insuranceFeePanelList != "") {
          }
        }, error: err => {
          console.log(err);
        }
      });
  }

  saveasdraftchangeofaddress(form: NgForm) {
    this.submitted = true;
    //    console.log("form value "+ form.value.c_add1);
    this.changeofaddressdto.c_add1 = form.value.c_add1;
    this.changeofaddressdto.c_add2 = form.value.c_add2;
    this.changeofaddressdto.c_add3 = form.value.c_add3;
    this.changeofaddressdto.c_pincode = form.value.c_pincode;


    this.changeofaddressdto.p_add1 = form.value.p_add1;
    this.changeofaddressdto.p_add2 = form.value.p_add2;
    this.changeofaddressdto.p_add3 = form.value.p_add3;
    this.changeofaddressdto.p_pincode = form.value.p_pincode;

    this.changeofaddressdto.state_cd = form.value.stateID;
    this.changeofaddressdto.pur_cd = 4;
    if (this.submitted && form.valid) {
      this.commonservice.saveasdraftchangeofaddress(this.changeofaddressdto).subscribe({
        next: (saveAsDraftDataList: any) => {
          this.saveAsDraftDataList = saveAsDraftDataList;
          if (this.saveAsDraftDataList != "" && this.saveAsDraftDataList != null) {
            this.paymentData = this.saveAsDraftDataList[1];
            this.stepList = this.saveAsDraftDataList[2];
            localStorage.setItem('stepList', JSON.stringify(this.stepList));
            this.successDialogOpen();
            this.saveASdraft_btn_enble = false;
          }
        },
        error: err => {
          console.log(err);
        }
      });
    }

  }
  successDialogOpen() {
    this.action_descr = this.commonservice.getnextStep(1).action_descr;
    // if(this.saveASdraft_btn_enble){

    // }

    this.dialog.open(this.saveDraftSuccessDialog);
  }

  action_descr: string;
  step_action_descr: string;
  saveASdraft_btn_enble: boolean = true;
  payment_btn_enble: boolean;
  final_submit_btn_enabe: boolean;
  print_reciept_btn_enable: boolean;
  upload_document_btn_enable: boolean;
  book_appt_btn_enabled: boolean;

  succDialogClose() {
    this.step_action_descr = this.commonservice.getnextStep(1).action_descr;
    if ('Final Submit' === this.action_descr) {
      this.final_submit_btn_enabe = true;
    }
    if ('Print Receipt/SR Forms' === this.action_descr) {
      this.print_reciept_btn_enable = true;
    }
    if ('Upload Document' === this.action_descr) {
      this.upload_document_btn_enable = true;
    }
    if ('Payment' === this.action_descr) {
      this.saveASdraft_btn_enble = true;
      this.payment_btn_enble = true;
    }
    // if ('Book Appointment' === this.action_descr) {
    //   this.saveASdraft_btn_enble = true;
    //   this.payment_btn_enble = true;
    // }
    //this.router.navigate(['next-step-save-draft']);
  }

  feeCollectionDtls() {
    this.dialog.open(this.feeCollectionDtlsDialog);
  }
  confirmPaymentDialog() {
    this.commonservice.beforePayment(this.changeofaddressdto).subscribe({
      next: (resApplNo: any) => {
        this.applData = resApplNo;
        console.log(this.applData);
        window.open(this.applData, "_blank");
      },
      error: err => {
        console.log(err);
      }
    })
  }

  confirmBtnEnbled: boolean = false;
  checkedFeeDetails: boolean;

  readInstructionCheckBox() {
    if (this.checkedFeeDetails = true) {
      this.confirmBtnEnbled = true;
    }
  }
  checkboxesList = [
    {
      label: "Transfer of Ownership",
      name: 5,
      isSelected: false,
      disabled: true
    },
    {
      label: "Termination of Hypothecation",
      name: 7,
      isSelected: false,
      disabled: true
    },
    {
      label: "Duplicate RC",
      name: 3,
      isSelected: false,
      disabled: true
    },
    {
      label: "Change of Address",
      name: 4,
      isSelected: false,
      disabled: true
    },
    {
      label: "Addition of Hypothecation",
      name: "HPA",
      isSelected: false,
      disabled: true
    }
  ]
  isChangeLimitAccessToggle(item) {
    console.log(`Selected Item Name : ${item.name} and Value : ${item.label}`);
    if (item.name == 5 && item.isSelected == true) {
      this.trnsownership = true;
    }
    else if (item.name == 5 && item.isSelected == false) {
      this.trnsownership = false;
      this.insuranceDTLS = false;
      this.feePNL = false;
    }
    else if (item.name == 7 && item.isSelected == true) {
      this.hyptrmdtls = true;
    }
    else if (item.name == 7 && item.isSelected == false) {
      this.hyptrmdtls = false;
      this.insuranceDTLS = false;
      this.feePNL = false;
    }
    else if (item.name == 3 && item.isSelected == true) {
      this.duprcdtls = true;
    }
    else if (item.name == 3 && item.isSelected == false) {
      this.duprcdtls = false;
      this.insuranceDTLS = false;
      this.feePNL = false;
    }
    else if (item.name == 4 && item.isSelected == true) {
      this.chngadddtls = true;
      this.insuranceDTLS = true;
      this.feePNL = true;
    }
    else if (item.name == 4 && item.isSelected == false) {
      this.chngadddtls = false;
      this.insuranceDTLS = false;
      this.feePNL = false;
    }
    else if (item.name == "AOH" && item.isSelected == true) {
      this.hypadddtls = true;
    }
    else if (item.name == "AOH" && item.isSelected == false) {
      this.hypadddtls = false;
      this.insuranceDTLS = false;
      this.feePNL = false;
    }
  }

  getAllStateList() {
    this.commonservice.getAllStateList().subscribe({
      next: (states: any[]) => {
        this.stateList = states;
      },
      error: err => {
        console.log(err);
      }
    }
    );
  }

  getOfficeListByStateCode(stateCode: any) {
    this.commonservice.getOfficeListByStateCode(stateCode).subscribe({
      next: (district: any[]) => {
        this.districtList = district;
      },
      error: err => {
        console.log(err);
      }
    });
  }

  // pAddDistrictList: any;
  getOfficeListByStateCodeForPaddress(stateCode: any) {
    this.commonservice.getOfficeListByStateCode(stateCode).subscribe({
      next: (district: any[]) => {
        this.districtList = district;
      },
      error: err => {
        console.log(err);
      }
    });
  }

  spaceNotAllowed(onlySpace: any) {
    return this.customValidator.spaceNotAllowed(onlySpace);
  }

  onlyNumberAllowed(onlyNumber: any) {
    return this.customValidator.onlyNumberAllowed(onlyNumber);
  }

  checkMee(e: any) {
    this.test = e;
  }
}