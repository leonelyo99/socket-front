import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { SocketService } from '../../services/socket/socket.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit {
  @Input() userToMessage = null;
  public newMessage: string = '';
  public subscriptionListenMessage: Subscription = null;

  constructor(
    public socketService: SocketService,
    public authService: AuthService
  ) {
    // this.socketService.incomingMessage.subscribe(resp => {
    //   console.log("respuesta del socket")
    //   console.log(resp)
    //   if (!resp.error) {
    //     this.socketService.messages.push(resp.message);
    //     console.log(resp);
    //   }
    // })

    this.subscriptionListenMessage = this.socketService
      .listenMessage(this.socketService.room)
      .subscribe((resp) => {
        console.log('respuesta');
        console.log(resp);
        if (!resp.error) {
          this.socketService.messages.push(resp.message);
          console.log(resp);
        }
      });
  }

  ngOnInit(): void {}

  send() {
    if (!!this.subscriptionListenMessage) {
      this.subscriptionListenMessage.unsubscribe();
    }

    !!this.newMessage &&
      !!this.socketService.room &&
      this.socketService.newMessage({
        message: this.newMessage,
        room: this.socketService.room,
        user: {
          token: this.authService.token,
          username: this.authService.username,
        },
      });

    this.subscriptionListenMessage = this.socketService
      .listenMessage(this.socketService.room)
      .subscribe((resp) => {
        console.log('respuesta');
        console.log(resp);
        if (!resp.error) {
          this.socketService.messages.push(resp.message);
          console.log(resp);
        }
      });
  }
}
