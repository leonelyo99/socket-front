import { Component, OnInit } from '@angular/core';
import { SocketService } from './services/socket.service';

@Component({
  selector: 'app-pages',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})

export class PageComponent implements OnInit {

  public message: any;

  constructor(private socketService: SocketService) { 
    // this.socketService.message.subscribe(doc => {
    //   this.message = doc.message
    // });
  }

  ngOnInit() {}
}
