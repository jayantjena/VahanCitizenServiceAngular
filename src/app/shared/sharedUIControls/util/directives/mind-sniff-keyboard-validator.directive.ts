import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { AppConfigService } from 'src/app/services/common/appConfig.service';


@Directive({
    selector: '[ngm-sniff-keyboard]'
})
export class DataTypeValidatorDirective {
    elemRef: ElementRef
    charSet: any = [];
    constructor(private el: ElementRef, private _appConfig: AppConfigService) {
        this.elemRef = el;
    }
    @Input() inputDataType: number;

    @HostListener('paste', ['$event']) blockPaste(e: ClipboardEvent) {
        if (this._appConfig.getAppConfig('isAllowCopyPaste')) {
            const { clipboardData } = e;
            const pastedText = clipboardData.getData('text');
            let result = this.validateString(pastedText);
            if (!result) {
                e.preventDefault();
            }
        }
        else {
            e.preventDefault();
        }
    }

    @HostListener('drop', ['$event']) blockDragdrop(e: DragEvent) {
        if (this._appConfig.getAppConfig('isAllowCopyPaste')) {
            const { dataTransfer } = e;
            const pastedText = dataTransfer.getData('text');
            let result = this.validateString(pastedText);
            if (!result) {
                e.preventDefault();
            }
        }
        else {
            e.preventDefault();
        }
    }

    validateString(stringValue: string) {

        let KeyboardSelectionEnumValue: number = this.inputDataType;

        if (KeyboardSelectionEnumValue >= 26 || KeyboardSelectionEnumValue < 0) {
            return false;
        } else {
            this.charSet = this.characterSet();
        }

        for (let i = 0; i < stringValue.length; i++) {
            let stringchar = stringValue.charAt(i);
            if (this.charSet[KeyboardSelectionEnumValue].indexOf(stringchar) == -1) {
                return false;
            }
        }
        return true;
    }

    @HostListener('keypress', ['$event']) onkeypress(event) {

        let key = event.keyCode;
        let KeyboardSelectionEnumValue: number = this.inputDataType;

        if (KeyboardSelectionEnumValue >= 26 || KeyboardSelectionEnumValue < 0) {
            return false;
        }
        else {
            this.charSet = this.characterSet();
        }
        var charcter = event.key;
        if (this.charSet[KeyboardSelectionEnumValue].indexOf(charcter) == -1) {
            if (key != 13) {
                if (key == 0) {
                    return;
                }
                else {
                    event.returnValue = null;
                    event.preventDefault();
                }

            }
        }
        if (key == 32 && event.target.value.trim() == "") {
            event.target.value = "";
            return false;
        }

    }

    characterSet() {
        var charSet = new Array();
        charSet[0] = "0123456789";																	//Positive
        charSet[1] = "0123456789.";																	//PositiveDecimal
        charSet[2] = "0123456789-";																	//Negative
        charSet[3] = "0123456789.-";																	//NegativeDecimal
        charSet[4] = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";													//Alphabet
        charSet[5] = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ ";													//AlphabetSpace
        charSet[6] = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ01234567890";										//AlphabetNumeric
        charSet[7] = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ01234567890-/_ .(),;[]\\\\";									//AlphabetNumericSpace
        charSet[8] = "0123456789-";																	//Date
        charSet[9] = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ01234567890-_,@.;-";		//EMail
        charSet[10] = "0123456789- ()";	//zipcode															//Phone (US Phone Numbers)
        charSet[11] = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ01234567890-_.@|#$!%^&*( ){}[]:;â€œâ€˜<>+\\\\";			//Passwords
        charSet[12] = "0123456789- :";																	//Date Time
        charSet[13] = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ01234567890 ";			//CDN and Invoice No
        charSet[14] = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ01234567890_.:-\\\\";		//URL
        charSet[15] = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ01234567890-_,@.;-";
        charSet[16] = "0123456789/";	//AlphabetNumericSpecialChar
        charSet[17] = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ01234567890/";
        charSet[18] = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ01234567890-";
        charSet[19] = "0123456789.";
        charSet[20] = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ01234567890.";
        charSet[21] = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ01234567890-_./\\\\"; //for alphanumeric with hyphen and underscore
        charSet[22] = "0123456789-+ ()";//phone and fax
        charSet[23] = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ01234567890.-_ "; // For Name
        charSet[24] = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ01234567890-_.,@|#$!%^&*( ){}[]:;â€œâ€˜<>+\\\\";			//label print
        charSet[25] = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ01234567890-_./,@|#$!%^&*( ){}[]:;â€œâ€˜<>+\\\\";			//reason for change s level
        return charSet;
    }
}
