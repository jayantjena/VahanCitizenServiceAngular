//Rahul add NumbersOnlyDirective  
import { NgModule } from '@angular/core';
import { BlockCopyPasteDirective } from './block-copy-paste.directive';
import { EmailValidatorDirective } from './email-validator.directive';
import { MyFocusDirective } from './focus.directive';
import { ShowHideInput } from './mind-input-show-hide.directive';
import { MindMaxLenghtDirective } from './mind-max-length-validator.directive';
import { MindMinLenghtDirective } from './mind-min-length-validator.directive';
import { MindRequiredDirective } from './mind-required-validator.directive';
import { DataTypeValidatorDirective } from './mind-sniff-keyboard-validator.directive';
import { ResizableModule } from './mind-resizable/resizable.module';
import { NumbersOnlyDirective } from './numberOnlyDirective.directive';   // added by rahul new Drective


@NgModule({ 
  declarations: [
    BlockCopyPasteDirective,
    EmailValidatorDirective,
    MyFocusDirective,
    ShowHideInput,
    MindMaxLenghtDirective,
    MindMinLenghtDirective,
    MindRequiredDirective,
    DataTypeValidatorDirective,
	  NumbersOnlyDirective
  ],
  imports: [ResizableModule
  ],
  exports:[
    BlockCopyPasteDirective,
    EmailValidatorDirective,
    MyFocusDirective,
    ShowHideInput,
    MindMaxLenghtDirective,
    MindMinLenghtDirective,
    MindRequiredDirective,
    DataTypeValidatorDirective,
    ResizableModule,
	  NumbersOnlyDirective
  ],
  providers:[
    
  ]
})
export class MindDirectiveModule { }
