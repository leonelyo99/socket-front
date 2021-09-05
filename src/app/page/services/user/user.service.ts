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
export class UserService {
  constructor(public http: HttpClient) {}

  getUsers() {
    let url = environment.apiURL + '/user/users';
    return this.http
      .get(url)
      .pipe(
        catchError((err) =>
          of([Swal.fire('Error users', err.error.message, 'error')])
        )
      );
  }
}
