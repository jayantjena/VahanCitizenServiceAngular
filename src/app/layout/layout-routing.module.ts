import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { NgModule } from '@angular/core';
import { VsHomeComponent } from './modules/homepage/vs-home/vs-home.component'; 
import { VerifyReceiptComponent } from './modules/homepage/verify-receipt/verify-receipt.component';
import { UserManualComponent } from './modules/homepage/user-manual/user-manual.component';
import { FaqComponent } from './modules/homepage/faq/faq.component'; 
import { SessionExpireComponent } from '../shared/message.config/session-expire/session-expire.component';
import { NocIssuedVehicleComponent } from './modules/homepage/noc-issued-vehicle/noc-issued-vehicle.component';
import { TemporaryRegistedVehicleComponent } from './modules/homepage/temporary-registed-vehicle/temporary-registed-vehicle.component';
import { KnowYourComplainStatusComponent } from './modules/homepage/know-your-complain-status/know-your-complain-status.component';
import { RegistercomplaintComponent } from './modules/homepage/registercomplaint/registercomplaint.component';
import { LoginComponent } from './modules/homepage/admin/login/login.component';
import { RegistrationComponent } from './modules/homepage/admin/registration/registration.component';
import { ScreenReaderComponent } from './modules/homepage/screen-reader/screen-reader.component';
import { SitemapComponent } from './modules/homepage/sitemap/sitemap.component';
 
export const routes: Routes = [
  {
    path: '', component: LayoutComponent, data: { breadcrumb: null },
    children: [ 
      // { path : '', redirectTo:'vahanservice', pathMatch:'full'},
      // { path : 'vahanservice', component : VsNewLayoutComponent, data: { reuse: false }},
      { path:'vahanservice', component : VsHomeComponent, data: { reuse: false, breadcrumb: 'Home' }},
      { path:'verifyreceipt',component:VerifyReceiptComponent, data: { reuse: false, breadcrumb: 'VerifyReceipt' }},
      { path:'screen-reader',component:ScreenReaderComponent, data: { reuse: false, breadcrumb: 'ScreenReader' }},
      { path:'site-map',component:SitemapComponent, data: { reuse: false, breadcrumb: 'sitemap' }},
      { path:'portal-login', component:LoginComponent, data: { reuse: false }},
      { path:'user-registration', component:RegistrationComponent, data: { reuse: false }},
      { path:'faq', component:FaqComponent, data: { reuse: false }},
      { path:'user-manual', component:UserManualComponent, data: { reuse: false }},
      { path:'noc-issued-vehicle', component:NocIssuedVehicleComponent, data: { reuse: false }},
      { path:'temporary-registed-vehicle', component:TemporaryRegistedVehicleComponent, data: { reuse: false }},
      { path:'session-expire', component:SessionExpireComponent},
      { path:'user-complaint', component:RegistercomplaintComponent, data: { reuse: false }},
      { path:'complaint-status', component:KnowYourComplainStatusComponent, data: { reuse: false }},
      // { path: 'vahan', loadChildren:()=>import('./modules/homepage/homepage.module').then(m=>m.HomepageModule), data: { reuse: false }},
      { path: 'vs', loadChildren: ()=> import('./modules/vs.module').then(m=>m.VsModule) },
      { path: '**', component: VsHomeComponent, data: { reuse: false }},
     
    ]
  }];
  
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
