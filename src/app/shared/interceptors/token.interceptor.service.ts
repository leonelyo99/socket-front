import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import Swal from 'sweetalert2';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthService } from '../services/auth/auth.service';
import {HelperErrorService} from '../helpers/errors.service';

@Injectable()
export class TokenInterceptorService implements HttpInterceptor {
  private AUTH_HEADER = 'Authorization';

  constructor(private authService: AuthService, private helperErrorService: HelperErrorService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (!req.headers.has('Content-Type')) {
      req = req.clone({
        headers: req.headers.set('Content-Type', 'application/json'),
      });
    }
    req = this.addAuthenticationToken(req);
    return next
      .handle(req)
      .pipe(
        map((resp: HttpResponse<any>) => {
          if (!!resp.headers && !!resp.headers.get('X-Token')) {
            const token = resp.headers.get('X-Token');
            localStorage.setItem('token', token);
            this.authService.token = token;
          }
          return resp;
        })
      )
      .pipe(
        catchError((error: HttpErrorResponse) => {
          Swal.fire('Error', this.helperErrorService.getErrorMessage(error.error.message), 'error');
          if (error && error.status === 401) {
            this.authService.logOut();
          }
          return throwError(error);
        })
      );
  }

  private addAuthenticationToken(request: HttpRequest<any>): HttpRequest<any> {
    if (!this.authService.token) {
      return request;
    }
    if (request.url.match(/localhost\//)) {
      return request;
    }
    return request.clone({
      headers: request.headers.set(
        this.AUTH_HEADER,
        'Bearer ' + this.authService.token
      ),
    });
  }
}
