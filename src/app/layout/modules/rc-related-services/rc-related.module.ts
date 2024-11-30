import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RcRelatedRoutingServicesRoutingModule } from './rc-related-routing-services-routing.module';
  
 
import { RcRelatedComponent } from './rc-related.component'; 
import { MaterialModule } from 'src/app/shared/material/material.module';
import { OnlineServiceListComponent } from 'src/app/shared/menu-service-component/onlinesrvlist/online-service-list/online-service-list.component';
import { AadharAuthenticationComponent } from './aadhar-authentication/aadhar-authentication.component';
import { AddressDetailsComponent } from './address-details/address-details.component';
import { ApplstatusComponent } from './applstatus/applstatus.component';
import { ChangeAddressComponent } from './change-address/change-address.component';
import { CheckpentransComponent } from './checkpentrans/checkpentrans.component';
import { DuplicateRcComponent } from './duplicate-rc/duplicate-rc.component';
import { FeePanelComponent } from './fee-panel/fee-panel.component';
import { HypothecationAdditionComponent } from './hypothecation-addition/hypothecation-addition.component';
import { HypothecationTerminationComponent } from './hypothecation-termination/hypothecation-termination.component';
import { InsuranceDetailsComponent } from './insurance-details/insurance-details.component';
import { PendingstagesComponent } from './pendingstages/pendingstages.component';
import { PgiComponent } from './pgi/pgi.component';
import { ToCaHpDrcHdComponent } from './to-ca-hp-drc-hd/to-ca-hp-drc-hd.component';
import { TransferOfOwnershipDetailComponent } from './transfer-of-ownership-detail/transfer-of-ownership-detail.component';
import { ServiceUserEntryPageComponent } from './service-user-entry-page/service-user-entry-page.component';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MindDirectiveModule } from 'src/app/shared/sharedUIControls/util/directives/directive.module';
import { NgOtpInputModule } from 'ng-otp-input';
 
 

export function HttpLoaderFactory(http:HttpClient){
  return new TranslateHttpLoader(http);
}
 
@NgModule({
  declarations: [
    RcRelatedComponent,
    OnlineServiceListComponent,
    ServiceUserEntryPageComponent,
    ToCaHpDrcHdComponent,
    TransferOfOwnershipDetailComponent,
    AddressDetailsComponent,
    DuplicateRcComponent,
    HypothecationAdditionComponent,
    HypothecationTerminationComponent,
    ChangeAddressComponent,
    InsuranceDetailsComponent,
    FeePanelComponent,
    AadharAuthenticationComponent,
    PgiComponent,
    // ReprintreceiptComponent,
    CheckpentransComponent,
    ApplstatusComponent,
    PendingstagesComponent,
     
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    MindDirectiveModule,
    RcRelatedRoutingServicesRoutingModule,
    NgOtpInputModule,
    TranslateModule.forRoot({
      loader:{
        provide:TranslateLoader,
        useFactory:HttpLoaderFactory,
        deps:[HttpClient]
      }
    })
  ] 
})
export class RcRelatedModule { }
