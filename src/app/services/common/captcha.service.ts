import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CaptchaService {

  constructor() { }

  generateCaptcha() {
    var alpha = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L',
      'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '1', '2', '3', '4',
      '5', '6', '7', '8', '9', '0', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l',
      'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '!', '@', '#', '$',
      '%', '^', '&', '*', '+'
    ];
    var a = alpha[Math.floor(Math.random() * 71)];  
    var b = alpha[Math.floor(Math.random() * 71)];
    var c = alpha[Math.floor(Math.random() * 71)];
    var d = alpha[Math.floor(Math.random() * 71)];
    var e = alpha[Math.floor(Math.random() * 71)];
    var f = alpha[Math.floor(Math.random() * 71)];

    return a + b + c + d + e + f;
  }
}
