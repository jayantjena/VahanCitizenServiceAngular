import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VsRoutingModule } from './vs-routing.module';
import { VsComponent } from './vs.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';  
import { ServicesMenuComponent } from 'src/app/shared/menu-service-component/onlinesrvlist/services-menu/services-menu.component';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

export function HttpLoaderFactory(http:HttpClient){
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    VsComponent, 
    ServicesMenuComponent, 
     
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    VsRoutingModule,
    TranslateModule.forRoot({
      loader:{
        provide:TranslateLoader,
        useFactory:HttpLoaderFactory,
        deps:[HttpClient]
      }
    })
  ],
  // providers: [AuthGuard],
})
export class VsModule { }
