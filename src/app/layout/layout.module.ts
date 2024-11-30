import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { TopHeaderComponent } from '../shared/top-header/top-header.component';
import { LogoHeaderComponent } from '../shared/logo-header/logo-header.component';
 
import { MaterialModule } from '../shared/material/material.module';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { MenuComponent } from '../shared/menu/menu.component';
import { LeftSidebarComponent } from './modules/homepage/left-sidebar/left-sidebar.component';
import { VsHomeComponent } from './modules/homepage/vs-home/vs-home.component'; 
import { RightSidebarComponent } from './modules/homepage/right-sidebar/right-sidebar.component';
import { MaphomepageComponent } from './modules/homepage/maphomepage/maphomepage.component'; 
import { SessionExpireComponent } from '../shared/message.config/session-expire/session-expire.component';
import { FooterComponent } from '../shared/footer/footer.component';
import { FaqComponent } from './modules/homepage/faq/faq.component';
import { NocIssuedVehicleComponent } from './modules/homepage/noc-issued-vehicle/noc-issued-vehicle.component';
import { TemporaryRegistedVehicleComponent } from './modules/homepage/temporary-registed-vehicle/temporary-registed-vehicle.component';
import { UserManualComponent } from './modules/homepage/user-manual/user-manual.component';
import { VerifyReceiptComponent } from './modules/homepage/verify-receipt/verify-receipt.component';
import { KnowYourComplainStatusComponent } from './modules/homepage/know-your-complain-status/know-your-complain-status.component';
import { RegistercomplaintComponent } from './modules/homepage/registercomplaint/registercomplaint.component';
import { LoginComponent } from './modules/homepage/admin/login/login.component';
import { RegistrationComponent } from './modules/homepage/admin/registration/registration.component';
import { BeforeServiceComponent } from './modules/homepage/before-service/before-service.component';
import { MindDirectiveModule } from '../shared/sharedUIControls/util/directives/directive.module';
import { ScreenReaderComponent } from './modules/homepage/screen-reader/screen-reader.component';
import { InitialCapitalizePipe } from '../shared/pipe/initial-capitalize.pipe';
import { BreadcrumbComponent } from '../shared/breadcrumb/breadcrumb.component';
import { SitemapComponent } from './modules/homepage/sitemap/sitemap.component';
  
export function HttpLoaderFactory(http:HttpClient){
  return new TranslateHttpLoader(http);
}
@NgModule({

  imports: [
    LayoutRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule, 
    MaterialModule,
    MindDirectiveModule,
    TranslateModule.forRoot({
      loader:{
        provide:TranslateLoader,
        useFactory:HttpLoaderFactory,
        deps:[HttpClient]
      }
    })
  ],
  declarations: [
    LayoutComponent,
    TopHeaderComponent,
    LogoHeaderComponent, 
    MenuComponent,
    VsHomeComponent,
    LeftSidebarComponent,
    MaphomepageComponent,
    RightSidebarComponent, 
    SessionExpireComponent, 
    FooterComponent,
    VerifyReceiptComponent,
    FaqComponent,
    UserManualComponent,
    NocIssuedVehicleComponent,
    TemporaryRegistedVehicleComponent,
     
    KnowYourComplainStatusComponent,
    RegistercomplaintComponent,
    LoginComponent,
    RegistrationComponent,
    BeforeServiceComponent,
    ScreenReaderComponent,
    InitialCapitalizePipe,
    BreadcrumbComponent,
    SitemapComponent,
    ],
     
    providers: [
    ]
})
export class LayoutModule { }
