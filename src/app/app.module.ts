import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgOtpInputModule } from 'ng-otp-input';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthInterceptor } from './services/auth/authInterceptor.service';
import { DialogBodyComponent } from './shared/dialog-body/dialog-body.component'; 
import { LoaderService } from './services/common/loader.service';
import { ErrorHandlingComponent } from './shared/errorHandling/errorHandling.component';
import { AuthService } from './services/auth/auth.service';
import { LoggerService } from './services/common/logger.service';
import { SessionService } from './services/common/session.service';
import { ErrorHandlingService } from './shared/errorHandling/errorHandling.service';
import { MessageService } from './services/common/message.service';
import { GlobalConstants } from './globalConstants.class';
import { AppConfigService } from './services/common/appConfig.service'; 
import { MenulistserviceService } from './layout/modules/homepage/left-sidebar/menulistservice.service';
import { CachingInterceptor } from './services/cache/caching.interceptor';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { BreadcrumbComponent } from './shared/breadcrumb/breadcrumb.component'; 

export function HttpLoaderFactory(http:HttpClient){
  return new TranslateHttpLoader(http);
}

// export function setupAppConfigFactory(appConfigService: AppConfigService): Function {
//   return () => appConfigService.setAppConfig('appConfig');

// }
@NgModule({
  declarations: [
    AppComponent,
    DialogBodyComponent, 
    
    // ErrorHandlingComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    NgOtpInputModule,
    HttpClientModule, 
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MatDialogModule,
    TranslateModule.forRoot({
      loader:{
        provide:TranslateLoader,
        useFactory:HttpLoaderFactory,
        deps:[HttpClient]
      }
    }),
    BrowserAnimationsModule 
    
    
  ],
  providers: [
    LoaderService,
    {provide: HTTP_INTERCEPTORS, useClass:AuthInterceptor, multi:true},
    {provide: HTTP_INTERCEPTORS, useClass:CachingInterceptor, multi:true},
    AuthService, 
    SessionService,
    LoggerService,
    ErrorHandlingService,
    MessageService,
    AppConfigService,
    GlobalConstants,
    MenulistserviceService 
    // {
    //   provide: APP_INITIALIZER,
    //   useFactory: setupAppConfigFactory,
    //   deps: [AppConfigService, GlobalConstants],
    //   multi: true
    // },
  ],
  
  bootstrap: [AppComponent],
  
})
export class AppModule { }
