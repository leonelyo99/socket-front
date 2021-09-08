import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { UserService } from '../../services/user/user.service';
import { SocketService } from '../../services/socket/socket.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css'],
})
export class ContactsComponent implements OnInit {
  @Output() setContact = new EventEmitter<any>();
  public selectedUser;
  public subscriptionListenNotification: Subscription = null;
  public contacts: any[] = [];
  public notifications: string[] = [];

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private socketService: SocketService
  ) {
    this.subscriptionListenNotification = this.socketService
      .listenNotification(this.authService.userId)
      .subscribe((resp) => {
        !!this.selectedUser._id &&
          this.selectedUser._id != resp &&
          this.notifications.push(resp);
      });
  }

  ngOnInit(): void {
    this.userService
      .getUsers(this.authService.userId)
      .subscribe((resp: any) => {
        resp.ok && this.contacts.push(...resp.users);
        resp.ok && this.handleSetContact(0);
      });
  }

  logout() {
    this.authService.logOut();
  }

  handleSetContact(index) {
    this.setContact.emit(this.contacts[index]);
    this.selectedUser = this.contacts[index];
    this.userService
      .getUserMessages(this.contacts[index])
      .subscribe((resp: any) => {
        this.notifications = this.notifications.filter(
          (userId) => userId !== this.contacts[index]._id
        );
        this.socketService.room = resp.room;
        this.socketService.messages = resp.messages;
      });
  }

  haveNotification(id) {
    return this.notifications.some((notified) => notified === id);
  }
}
