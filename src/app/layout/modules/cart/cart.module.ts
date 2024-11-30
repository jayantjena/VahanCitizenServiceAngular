import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { CaptchaService } from 'src/app/services/common/captcha.service';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { CartRoutingModule } from './cart-routing.module';
import { CartComponent } from './cart.component';
import { CartLoginComponent } from './cart-login/cart-login.component';
import { CartRegistrationComponent } from './cart-registration/cart-registration.component';

export function HttpLoaderFactory(http:HttpClient){
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    CartComponent,
    CartLoginComponent,
    CartRegistrationComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CartRoutingModule,
    MaterialModule,
    TranslateModule.forRoot({
      loader:{
        provide:TranslateLoader,
        useFactory:HttpLoaderFactory,
        deps:[HttpClient]
      }
    })
  ],
  providers:[CaptchaService]
})
export class CartModule { }
