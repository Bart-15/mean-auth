import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

import { Observable } from 'rxjs';

@Injectable()
export class HttpconfigInterceptor implements HttpInterceptor {

  constructor(private cookieService: CookieService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.cookieService.get('token')
    const modifiedReq = request.clone({ 
      headers: request.headers.set('Authorization', `Bearer ${token}`),
    });
    return next.handle(modifiedReq);
  }
}
