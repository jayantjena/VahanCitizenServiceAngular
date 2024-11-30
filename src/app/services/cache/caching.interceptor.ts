import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, of, tap, throwError } from 'rxjs';

@Injectable()
export class CachingInterceptor implements HttpInterceptor {
// store the caching value of request and response
  cacheMap= new Map<string,HttpResponse<any>>();
  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if(this.isRequestCachableData(request)){
    const url = request.url.toLocaleLowerCase();
    if(this.cacheMap.has(url)){
      // exit
      const res = this.cacheMap.get(url) as HttpResponse<any>;
      return of(res);
    }else{
      // not exit
      return next.handle(request).pipe(
        tap(event =>{
          if(event instanceof HttpResponse){
            this.cacheMap.set(url,event)
          }
        })
      ).pipe(catchError(err => {
        // this.loaderService.hide(10);
        const httpErrorResponse = new HttpErrorResponse({error: 'Server side error'});
        return throwError(()=>{return  httpErrorResponse;});
    }))
    }
  }
  else{
    // default work
      return next.handle(request);    
  }
}

private isRequestCachableData(request: HttpRequest<unknown>):boolean{
    if(request.method=='GET'){
    // filter code 
    return true;
    }
    return false;
    }
}
