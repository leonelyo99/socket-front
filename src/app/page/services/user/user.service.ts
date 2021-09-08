import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { map, catchError, filter } from 'rxjs/operators';
import { of } from 'rxjs';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { Resp } from '../../models/Resp.model';
import { User } from '../../../shared/models/User.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(public http: HttpClient, private authService: AuthService) {}

  getUsers(userId: string) {
    let url = environment.apiURL + '/user/users';
    return this.http
      .get(url)
      .pipe(
        map(({ error, data }: Resp<User[]>) => ({
          data: data.filter((user: User) => user._id !== userId),
          error,
        }))
      )
      .pipe(
        catchError((err) =>
          of([Swal.fire('Error users', err.error.message, 'error')])
        )
      );
  }

  getUserMessages(user:User) {
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
