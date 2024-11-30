import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; 
import { RcRelatedComponent } from './rc-related.component'; 
import { OnlineServiceListComponent } from 'src/app/shared/menu-service-component/onlinesrvlist/online-service-list/online-service-list.component';
import { AadharAuthenticationComponent } from './aadhar-authentication/aadhar-authentication.component';
import { ApplstatusComponent } from './applstatus/applstatus.component';
import { CheckpentransComponent } from './checkpentrans/checkpentrans.component';
import { PendingstagesComponent } from './pendingstages/pendingstages.component';
import { PgiComponent } from './pgi/pgi.component';
import { ToCaHpDrcHdComponent } from './to-ca-hp-drc-hd/to-ca-hp-drc-hd.component';
import { ChangeAddressComponent } from './change-address/change-address.component';
import { DuplicateRcComponent } from './duplicate-rc/duplicate-rc.component';
import { FeePanelComponent } from './fee-panel/fee-panel.component';
import { HypothecationAdditionComponent } from './hypothecation-addition/hypothecation-addition.component';
import { HypothecationTerminationComponent } from './hypothecation-termination/hypothecation-termination.component';
import { InsuranceDetailsComponent } from './insurance-details/insurance-details.component';
import { TransferOfOwnershipDetailComponent } from './transfer-of-ownership-detail/transfer-of-ownership-detail.component';
import { ServiceUserEntryPageComponent } from './service-user-entry-page/service-user-entry-page.component';

const routes: Routes = [
  { path: '', component: RcRelatedComponent,
  children: [
      
      { path: 'userentrypage', component: ServiceUserEntryPageComponent},
      { path: 'tocahpdrchd', component: ToCaHpDrcHdComponent},
      { path: 'aadhat_auth', component: AadharAuthenticationComponent},
      { path: 'pgi-service', component: PgiComponent},
      { path: 'applstatus', component: ApplstatusComponent},
      { path: 'checkpentrans', component: CheckpentransComponent},
      { path: 'pendingstages', component:PendingstagesComponent},
      // { path:'', component:TransferOfOwnershipDetailComponent},
      // { path:'', component:DuplicateRcComponent},
      // { path:'', component:ChangeAddressComponent},
      // { path:'', component:HypothecationTerminationComponent},
      // { path:'', component:HypothecationAdditionComponent},
      // { path:'', component:InsuranceDetailsComponent},
      // {path:'', component:FeePanelComponent}
      { path: '', redirectTo: '/rcrs', pathMatch: 'full' },
      
  ]},
  
  

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RcRelatedRoutingServicesRoutingModule { }
