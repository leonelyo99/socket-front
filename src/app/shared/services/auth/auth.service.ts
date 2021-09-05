import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public username: any;
  public token: string;
  public userId: string;

  constructor(public http: HttpClient, public router: Router) {
    this.cargarStorage();
  }

  login(user: any) {
    let url = environment.apiURL + '/auth/login';
    return this.http
      .post(url, user)
      .pipe(
        map((resp) => {
          this.guardarStorage({ ...resp, username: user.username });
          return true;
        })
      )
      .pipe(
        catchError((err) =>
          of([Swal.fire('Error Login', err.error.message, 'error')])
        )
      );
  }

  logOut() {
    this.token = '';
    this.username = '';
    this.userId = '';

    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('userId');

    this.router.navigate(['/auth/login']);
  }

  signup(user: any) {
    let url = environment.apiURL + '/auth/signup';
    return this.http
      .post(url, user)
      .pipe(
        map((resp) => {
          this.guardarStorage({ ...resp, username: user.username });
          return true;
        })
      )
      .pipe(
        catchError((err) =>
          of([Swal.fire('Error Login', err.error.message, 'error')])
        )
      );
  }
  cargarStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.username = localStorage.getItem('username');
      this.userId = localStorage.getItem('userId');
    } else {
      this.token = '';
      this.username = '';
      this.userId = '';
    }
  }

  guardarStorage(resp: any) {
    localStorage.setItem('userId', resp.userId);
    localStorage.setItem('token', resp.token);
    localStorage.setItem('username', resp.username);

    this.username = resp.username;
    this.token = resp.token;
    this.userId = resp.userId;
  }
}
