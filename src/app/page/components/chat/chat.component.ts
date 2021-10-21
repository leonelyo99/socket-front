import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { SendMessage } from '../../models/SendMessage.model';
import { SocketService } from '../../services/socket/socket.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit {
  @Input() userToMessage = null;
  public newMessage: string = '';

  constructor(
    public socketService: SocketService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {}

  send(): void {
    !!this.newMessage &&
      !!this.socketService.room &&
      this.socketService.newMessage(
        new SendMessage(this.newMessage, this.socketService.room, {
          token: this.authService.token,
          username: this.authService.username,
        })
      );
    this.newMessage = '';
  }
}
