import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { map, catchError, filter } from 'rxjs/operators';
import { of } from 'rxjs';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { AuthService } from '../../../shared/services/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(public http: HttpClient, private authService: AuthService) {}

  getUsers(userId) {
    let url = environment.apiURL + '/user/users';
    return this.http
    .get(url)
    .pipe(
      map(({ ok, users }: any) => ({
        users: users.filter(
            (user: any) => user._id !== userId
          ),
          ok,
        }))
      )
      .pipe(
        catchError((err) =>
          of([Swal.fire('Error users', err.error.message, 'error')])
        )
      );
  }

  getUserMessages(user) {
    let url = environment.apiURL + `/user/messages`;
    const values = {
      users: [{ id: user._id }, { id: this.authService.userId }],
    };
    return this.http
      .post(url, values)
      .pipe(
        catchError((err) =>
          of([Swal.fire('Error users', err.error.message, 'error')])
        )
      );
  }
}
