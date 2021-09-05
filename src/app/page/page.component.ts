import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user/user.service';
import { SocketService } from './services/socket/socket.service';

@Component({
  selector: 'app-pages',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})

export class PageComponent implements OnInit {

  public message: any;
  public users: any;

  constructor(private userService: UserService, private socketService: SocketService) { 
    this.userService.getUsers().subscribe(users => {
      console.log(users)
      this.users = users;
    })
    // this.socketService.message.subscribe(doc => {
    //   this.message = doc.message
    // });
  }

  ngOnInit() {}

  
}
