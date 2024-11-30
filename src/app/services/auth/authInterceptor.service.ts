import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor 
} from '@angular/common/http';
import {Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor() {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
     request = request.clone({
        withCredentials: true
    });
   return next.handle(request);
}
}


// import { Injectable } from '@angular/core';
// import {
//   HttpHeaders,
//   HttpRequest,
//   HttpHandler,
//   HttpEvent,
//   HttpInterceptor,
//   HttpErrorResponse,
// } from '@angular/common/http';
// import { Observable, catchError, map, throwError } from 'rxjs';
// import { AuthService } from '../services/auth.service';
// import { environment } from 'src/environments/environment';
// import { Router } from '@angular/router';

// @Injectable()
// export class MyHttpInterceptor implements HttpInterceptor {
//   constructor(
//     private authService: AuthService,
//     private router: Router
//   ) { }

//   intercept(
//     req: HttpRequest<any>,
//     next: HttpHandler
//   ): Observable<HttpEvent<any>> {
//     const modifiedReq = req.clone({
//       headers: this.addExtraHeaders(req.headers),
//     });
//     return next.handle(modifiedReq).pipe(
//       catchError((e: HttpErrorResponse) => {
//         if (this.authService.token && e.status == 401) {
//           this.authService.logout().then((res) => {
//             if (res) {
//               this.router.navigate([environment.auth.loginUrl]);
//             }
//           });
//           return throwError(e);
//         } else {
//           return throwError(e);
//         }
//       })
//     );
//     /*
//     return throwError(new HttpErrorResponse({
//       status: 401,
//       statusText: 'Unauthorized',
//       error: []
//     }));
//     */
//   }

//   private addExtraHeaders(headers: HttpHeaders): HttpHeaders {
//     const extraHeaders: any = environment.api.headers;
//     for (const name in extraHeaders) {
//       if (extraHeaders.hasOwnProperty(name)) {
//         headers = headers.append(name, extraHeaders[name]);
//       }
//     }
//     if (this.authService.token) {
//       headers = headers.append('Authorization', 'Bearer ' + this.authService.token)
//     }
//     return headers;
//   }
// }
