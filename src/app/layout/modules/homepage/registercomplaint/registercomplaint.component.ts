import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LeftsidebarserviceService } from '../left-sidebar/leftsidebarservice.service';
import { Router } from '@angular/router';
import { UserManualServiceService } from '../user-manual/user-manual-service.service';

import { ComplaintserviceService } from './registercomplaint/complaintservice.service';
import { CustomvalidationService } from 'src/app/services/common/customvalidation.service';
import { AppResponseTypeEnum } from 'src/app/shared/Enum/AppResponseType.enum';
import { AppRequestHeaderModel } from 'src/app/shared/models/appRequestHeader.model';
import { AppResponse } from 'src/app/shared/models/appResponse';


@Component({
  selector: 'app-registercomplaint',
  templateUrl: './registercomplaint.component.html',
  styleUrls: ['./registercomplaint.component.css']
})
export class RegistercomplaintComponent implements OnInit {
  selectedFile: File;
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  message: string;
  imageName: any;
  complaintForm: FormGroup;
  stateListFilter: any;
  stateList: any;
  officeList: any[];
  officeListFilter: any;
  serviceList: any;
  submitted = false;

  ngOnInit() {
    this.complaintForm = this.fb.group({
      state_cd: ['', Validators.required],
      off_cd: ['', Validators.required],
      pur_cd: ['', Validators.required],
      regn_no: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      chasi_no: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(5)]],
      appl_no: ['', Validators.required],
      email_id: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
      mobile_no: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      problem_descr: ['', Validators.required],
      uploadImage: ['', [Validators.required, this.customValidator.fileUploadValidator('jpg, png, jpeg')]]
    })
    this.getAllStatesList();
  }

  constructor(private fb: FormBuilder,
    private httpClient: HttpClient,
    private complaintSrvice: ComplaintserviceService,
    private router: Router,
    private leftsidebarserviceService: LeftsidebarserviceService,
    private usermanualService: UserManualServiceService,
    private customValidator: CustomvalidationService) { }

  get rgnCmplFrm() {
    return this.complaintForm.controls;
  }

  complaintObj = {
    state_cd: "",
    off_cd: "",
    pur_cd: "",
    regn_no: " ",
    chasi_no: " ",
    appl_no: " ",
    email_id: "",
    mobile_no: " ",
    problem_descr: " ",
  }
  sizeLarge: string;
  typeMissmatch:string;
  
  public onFileChanged(event) {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile.size > 1024) {
      this.sizeLarge="Size must be 200KB, ";
    }
    if (this.selectedFile.type !="image/jpeg") {
      this.typeMissmatch=" Image only allowed for .JPG,.JPEG, .PNG";
    }
      
  }

  submitComplaint(form: any) {
    this.submitted = true;
    if (this.submitted) {
      this.complaintSrvice.onUpload(form, this.selectedFile)
        .subscribe((response: any) => {
          if (response.status === 200) {
            this.message = 'Image uploaded successfully';
          } else {
            this.message = 'Image not uploaded successfully';
          }
        });
    }

    if (this.complaintForm.invalid) {
      return;
    }
  }
  redirectHome() {
    this.router.navigate(['']);
  }
  reset() {
    this.complaintForm.reset();
  }
  spaceNotAllowed(onlySpace: any) {
    return this.customValidator.spaceNotAllowed(onlySpace);
  }
  onlyNumberAllowed(onlyNumber: any) {
    return this.customValidator.onlyNumberAllowed(onlyNumber);
  }

  getAllStatesList() { 
    const headerData = [];
    const filterParameter = {
      TranName: 'getAllStateList'
    };
    headerData.push(new AppRequestHeaderModel('filterParameter', filterParameter));
    this.leftsidebarserviceService.getAllStatesList(headerData, '/getAllStateList', false, true)
    .subscribe({next:(resp: AppResponse) => {
      if (resp.responseType === AppResponseTypeEnum.Success) {
        this.stateList = resp.response? resp.response: [];
        console.log(this.stateList);
        this.stateListFilter=this.stateList;
        console.log(this.stateListFilter);
      } else if (resp.responseType === AppResponseTypeEnum.Information) {
        
      } else if (resp.responseType === AppResponseTypeEnum.Error) {
        
      }
    },
   error:(err) => console.error("API exception")}
  );
}

  // getAllStatesList() {
  //   this.leftsidebarserviceService.getAllStatesList().subscribe({next:(states: any[]) => {
  //     this.stateList = states;
  //     this.stateListFilter = this.stateList;
  //     console.log(this.stateListFilter);
  //   },
  //     error:err => {
  //       console.log(err);
  //     }}
  //   );
  // }

  onChangeState(stateCode) {
    debugger
    const requrl = `/getOfficeListByStateCode/${stateCode}`
    const headerData = [];
    const filterParameter = {
      TranName: 'getOfficeListByStateCode',
      stateCode: stateCode.value
    };
    headerData.push(new AppRequestHeaderModel('filterParameter', filterParameter));
    this.leftsidebarserviceService.onChangeState(headerData, requrl, false, true)
    .subscribe({next:(resp: AppResponse) => {
      if (resp.responseType === AppResponseTypeEnum.Success) {
        this.officeList = resp.response? resp.response: [];
        this.officeListFilter=this.officeList;
        this.stateListFilter=this.stateList;
        
      } else if (resp.responseType === AppResponseTypeEnum.Information) {
        
      } else if (resp.responseType === AppResponseTypeEnum.Error) {
        
      }
    },
   error:(err) => console.error("API exception")}
  );
  // this.leftsidebarserviceService.onChangeState(stateCode.value).subscribe({next:(res:any[]) => {
    //     this.officeList = res;
    //     this.officeListFilter=this.officeList;
    //     this.stateListFilter=this.stateList;
    //     console.log("office list "+this.officeListFilter);
    //   },
    //   error:err => {
    //     console.log(err);
    //   }}
    // );

  }


  // onChangeState(stateCode) {
  //   // alert(stateCode.value);
  //   this.leftsidebarserviceService.onChangeState(stateCode).subscribe({next:(res: any[]) => {
  //     this.officeList = res;
  //     this.officeListFilter = this.officeList;

  //     console.log(this.officeListFilter);
  //   },
  //     error:err => {
  //       console.log(err);
  //     }});
  // }

  onChangeService(stateCode: any) {
    this.usermanualService.onChangeService(stateCode).subscribe({next:(services: any[]) => {
      this.serviceList = services;
    },
      error:err => {
        console.log(err);
      }});
  }

  getImage() {
    this.complaintSrvice.getImage()
      .subscribe(res => {
        this.retrieveResonse = res;
        this.base64Data = this.retrieveResonse.complaint_image;
        this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
      });
  }
}
