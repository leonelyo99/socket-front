import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth/auth.service';
import { SocketService } from './services/socket/socket.service';

@Component({
  selector: 'app-pages',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css'],
})
export class PageComponent implements OnInit {
  public userToMessage: any;
  public message: any;

  constructor(public authService: AuthService, public socketService: SocketService) {
    this.authService.cargarStorage();
  }

  ngOnInit() {}

  setContact(user: any) {
    this.userToMessage = user;
  }
}
