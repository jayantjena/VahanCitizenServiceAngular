import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
 import { PgiserviceService } from './pgiservice.service';
// import { ReprintreceiptComponent } from '../../reprintreceipt/reprintreceipt.component';

@Component({
  selector: 'app-pgi',
  templateUrl: './pgi.component.html',
  styleUrls: ['./pgi.component.css']
}) 
export class PgiComponent implements OnInit {
  sadakparivahanhindi = 'सड़क परिवहन और राज मार्ग मंत्रालय';
  roadtransport = 'MINISTRY OF ROAD TRANSPORT & HIGHWAYS';
  changeAddressDto: any;
  _url: string = "https://angular.io/api/router/RouterLink";
  urlSafe: SafeResourceUrl;
  serviceList:any;
   
  @ViewChild('iframeReprintReceiptDialog', { static: true }) iframeReprintReceiptDialog: TemplateRef<any>;
  // @ViewChild(ReprintreceiptComponent) reprintrcpt: ReprintreceiptComponent
  constructor(private route: Router,
    private router: ActivatedRoute,
    private pgiservice: PgiserviceService,
    public dialog: MatDialog,
    private _sanitizer: DomSanitizer) {
    }
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


  iframeRCDialogOpen() {
    this.dialog.open(this.iframeReprintReceiptDialog);
    this.urlSafe = this._sanitizer.bypassSecurityTrustResourceUrl(this._url);
    // this.reprintrcpt.printReport(this.changeAddressDto.state_cd, this.changeAddressDto.off_cd, this.changeAddressDto.appl_no,  this.changeAddressDto.regn_no);
  }

  ngOnInit(): void {
    this.router.queryParams.subscribe(params => {
      console.log(params?.['response']); // { orderby: "price" }
      this.pgiservice.getDataForPrintReciept(params?.['response'] + '').subscribe({next:(res: any[]) => {
        this.changeAddressDto = res;
        this.serviceList=this.changeAddressDto.serviceDto;
        console.log('Change Address Dto...'+this.changeAddressDto);
          // this.reprintrcpt.printReport( this.changeAddressDto.state_cd, this.changeAddressDto.off_cd, this.changeAddressDto.appl_no,  this.changeAddressDto.regn_no);
      },
        error:err => {
          console.log(err);
        }});
    });
  }

  printReciept(){
    // this.reprintrcpt.printReport( this.changeAddressDto.state_cd, this.changeAddressDto.off_cd, this.changeAddressDto.appl_no,  this.changeAddressDto.regn_no);
  }
}
