import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import Swal from 'sweetalert2';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../services/auth/auth.service';

@Injectable()
export class TokenInterceptorService implements HttpInterceptor {
  private AUTH_HEADER = 'Authorization';

  constructor(private authService: AuthService) {}

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

    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        Swal.fire('Error', error.error.message, 'error');
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
