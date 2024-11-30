 
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomepageRoutingModule } from './homepage-routing.module';
 import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { MaterialModule } from '../material/material.module';
// import { MessageComponent } from '../message.config/message/message.component';
 
 
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import {TranslateLoader,TranslateModule} from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { HomepageComponent } from './homepage.component';
 
import { MaterialModule } from 'src/app/shared/material/material.module';
import { DialogavailserviceComponent } from './dialogavailservice/dialogavailservice.component'; 
 
export function HttpLoaderFactory(http:HttpClient){
  return new TranslateHttpLoader(http);
}
@NgModule({
  declarations: [
    HomepageComponent,
    DialogavailserviceComponent
    
   ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HomepageRoutingModule,
    MaterialModule,
    TranslateModule.forRoot({
      loader:{
        provide:TranslateLoader,
        useFactory:HttpLoaderFactory,
        deps:[HttpClient]
      }
    })
  ],
  providers:[
    // VerifyReceiptComponent
  ]
   
   
})
export class HomepageModule { }
