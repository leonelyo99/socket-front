import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { UserService } from '../../services/user/user.service';
import { SocketService } from '../../services/socket/socket.service';
import { Subscription } from 'rxjs';
import { Resp } from '../../../shared/models/Resp.model';
import { IncomingMessages } from '../../models/IncomingMessages';
import { User } from '../../../shared/models/User.model';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css'],
})
export class ContactsComponent implements OnInit {
  @Output() setContact = new EventEmitter<User>();
  public selectedUser: User;
  public subscriptionListenNotification: Subscription = null;
  public contacts: User[] = [];
  public notifications: string[] = [];

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private socketService: SocketService
  ) {
    !!this.subscriptionListenNotification && this.subscriptionListenNotification.unsubscribe()
    this.subscriptionListenNotification = this.socketService
      .listenNotification(this.authService.userId)
      .subscribe((resp: Resp<string>) => {
        !!this.selectedUser._id &&
          this.selectedUser._id != resp.data &&
          this.notifications.push(resp.data);
      });
  }

  ngOnInit(): void {
    this.userService
      .getUsers(this.authService.userId)
      .subscribe((resp: Resp<User[]>) => {
        !resp.error && this.contacts.push(...resp.data);
        !resp.error && this.handleSetContact(0);
      });
  }

  logout() {
    this.authService.logOut();
  }

  handleSetContact(index: number):void {
    this.setContact.emit(this.contacts[index]);
    this.selectedUser = this.contacts[index];
    this.userService
      .getUserMessages(this.contacts[index])
      .subscribe((resp: Resp<IncomingMessages>) => {
        this.notifications = this.notifications.filter(
          (userId) => userId !== this.contacts[index]._id
        );
        this.socketService.room = resp.data.room;
        this.socketService.messages = resp.data.messages;
        this.socketService.listenMessage()
      });
  }

  haveNotification(id: string): boolean {
    return this.notifications.some((notified) => notified === id);
  }
}
