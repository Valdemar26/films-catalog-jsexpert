import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';


@Injectable()
export class FilmsInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (request.url.includes('genre')) {
      return next.handle(request);
    } else {
      return next.handle(request).pipe(
        tap((res) => {
          // console.log('intercepted: ', res);
        })
      );
    }

  }
}
