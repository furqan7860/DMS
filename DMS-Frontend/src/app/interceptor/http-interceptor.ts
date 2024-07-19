import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpEvent,
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {
    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        const token = JSON.parse(localStorage.getItem('user'));
        // Clone the request to add additional headers
        const clonedRequest = req.clone({
            setHeaders: {
                Authorization: `Bearer ${token?.token}`,
            },
        });

        if (req.url.includes('case')) {
            const params = new URL(req.urlWithParams).searchParams;
            const filterParam = params.get('filter');
            const filterObject = JSON.parse(decodeURIComponent(filterParam));

            console.log(filterObject);
        }

        return next.handle(clonedRequest).pipe(
            tap((data) => {
                console.log('data: ', data);
            })
        );
    }
}
