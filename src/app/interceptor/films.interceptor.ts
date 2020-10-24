import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { delay, tap } from 'rxjs/operators';

import { LoaderService } from '../shared/services/loader.service';


@Injectable()
export class FilmsInterceptor implements HttpInterceptor {

  constructor(private loaderService: LoaderService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // this.loaderService.show();

    if (request.url.includes('genre')) {
      return next.handle(request);
    } else {
      return next.handle(request).pipe(
        // tap(() => {
          // this.loaderService.hide();
        // })
      );
    }

  }
}
