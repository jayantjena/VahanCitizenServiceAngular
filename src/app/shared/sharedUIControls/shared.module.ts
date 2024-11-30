import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorDialogComponent } from '../error/error-dialog/error-dialog.component';
import { LoadingDialogComponent } from '../loading/loading-dialog/loading-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
 



@NgModule({
  declarations: [ ErrorDialogComponent, LoadingDialogComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
    ],
  exports:[
    CommonModule
  ]
})
export class sharedUIControlModule { }
