import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { deserialize } from 'serialize-ts/dist';
import { AUTH_ROUTE, SIGN_IN_ROUTE } from '../../shared/constants';
import { ErrorResponse } from '../../shared/models/error-response.model';

@Injectable()
export class BaseHttpInterceptor implements HttpInterceptor {

  constructor(private router: Router) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError(error => {
        if (error instanceof HttpErrorResponse) {
          if (error.status === 401) {
            this.router.navigate([AUTH_ROUTE, SIGN_IN_ROUTE]);
          }

          return throwError(deserialize(error.error, ErrorResponse));
        }
      })
    );
  }
}
