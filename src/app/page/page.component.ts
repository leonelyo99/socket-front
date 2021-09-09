import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../shared/services/auth/auth.service';
import { SocketService } from './services/socket/socket.service';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { Resp } from './models/Resp.model';

@Component({
  selector: 'app-pages',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css'],
})
export class PageComponent implements OnDestroy {
  public subscriptionListenError: Subscription = null;
  public userToMessage: any;
  public message: any;

  constructor(
    public authService: AuthService,
    public socketService: SocketService
  ) {
    this.authService.cargarStorage();
    this.subscriptionListenError = this.socketService
      .listenError()
      .subscribe((error:Resp<any>) => {
        Swal.fire('Error', error.data.message, 'error');
        if (error && error.data.status === 401) {
          this.authService.logOut();
        }
      });
  }

  ngOnDestroy(): void {
    !!this.subscriptionListenError &&
      this.subscriptionListenError.unsubscribe();
  }

  setContact(user: any) {
    this.userToMessage = user;
  }
}
