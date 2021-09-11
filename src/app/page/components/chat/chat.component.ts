import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../../../shared/services/auth/auth.service';
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
  ) {
  }

  ngOnInit(): void {}

  send(): void {
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
    this.newMessage = '';
    this.scrollToTop()
  }

  scrollToTop(){
    window.scroll(0,0);
  }
}
