import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { map} from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { Resp } from '../../../shared/models/Resp.model';
import { User } from '../../../shared/models/User.model';
import { IncomingMessages } from '../../models/IncomingMessages';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(public http: HttpClient, private authService: AuthService) {}

  getUsers(userId: string): Observable<Resp<User[]>> {
    let url = environment.apiURL + '/user/users';
    return this.http.get<Resp<User[]>>(url).pipe(
      map(({ error, data }: Resp<User[]>) => ({
        data: data.filter((user: User) => user._id !== userId),
        error,
      }))
    );
  }

  getUserMessages(user: User): Observable<Resp<IncomingMessages>> {
    let url = environment.apiURL + `/user/messages`;
    const values = {
      users: [{ id: user._id }, { id: this.authService.userId }],
    };
    return this.http.post<Resp<IncomingMessages>>(url, values);
  }
}
