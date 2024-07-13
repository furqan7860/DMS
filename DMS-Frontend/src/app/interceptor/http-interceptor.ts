import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = JSON.parse(localStorage.getItem('user'));    
    // Clone the request to add additional headers
    const clonedRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token?.token}`
      }
    });

    return next.handle(clonedRequest)
  }
}
