import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../../models/User.model';
import { Resp } from '../../models/Resp.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public username: string = null;
  public token: string = null;
  public userId: string = null;

  constructor(public http: HttpClient, public router: Router) {
    this.cargarStorage();
  }

  login(user: User): Observable<boolean> {
    let url = environment.apiURL + '/auth/login';
    return this.http
      .post(url, user)
      .pipe(
        map((resp: Resp<User>) => {
          this.guardarStorage(resp.data);
          return true;
        })
      )
      .pipe(catchError((err) => of(false)));
  }

  signup(user: User): Observable<boolean> {
    let url = environment.apiURL + '/auth/signup';
    return this.http
      .post(url, user)
      .pipe(
        map((resp: Resp<User>) => {
          this.guardarStorage(resp.data);
          return true;
        })
      )
      .pipe(catchError((err) => of(false)));
  }

  logOut(): void {
    this.token = '';
    this.username = '';
    this.userId = '';

    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('userId');

    this.router.navigate(['/auth/login']);
  }

  cargarStorage(): void {
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

  guardarStorage(resp: User): void {
    localStorage.setItem('userId', resp._id);
    localStorage.setItem('token', resp.token);
    localStorage.setItem('username', resp.username);

    this.username = resp.username;
    this.token = resp.token;
    this.userId = resp._id;
  }
}
