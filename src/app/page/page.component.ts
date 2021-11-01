import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../shared/services/auth/auth.service';
import { SocketService } from './services/socket/socket.service';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { Resp } from '../shared/models/Resp.model';
import { HelperErrorService } from '../shared/helpers/errors.service';

@Component({
  selector: 'app-pages',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css'],
})
export class PageComponent implements OnDestroy {
  public subscriptionListenError: Subscription = null;
  public seeContacts: boolean = false;

  constructor(
    public authService: AuthService,
    public socketService: SocketService,
    private helperErrorService: HelperErrorService
  ) {
    this.authService.loadStorage();
    this.subscriptionListenError = this.socketService
      .listenError()
      .subscribe((error: Resp<any>) => {
        Swal.fire(
          'Error',
          this.helperErrorService.getErrorMessage(error.data.message),
          'error'
        );
        if (error && error.data.status === 401) {
          this.authService.logOut();
        }
      });
  }

  ngOnDestroy(): void {
    !!this.subscriptionListenError &&
      this.subscriptionListenError.unsubscribe();
  }

  handleSeeContacts(): void {
    this.seeContacts = !this.seeContacts;
  }
}
