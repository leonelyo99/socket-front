import { Component, OnInit } from '@angular/core';
import { SocketService } from '../../services/socket/socket.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  public messages: string[] = [];
  public newMessage: string = '';

  constructor(private socketService:SocketService) {
    this.socketService.incomingMessage.subscribe(incomingMessage => {
      console.log(incomingMessage.data)
      this.messages.push(incomingMessage.data)
    })
  }

  ngOnInit(): void {
  }

  send(){
    !!this.newMessage && this.socketService.newMessage(this.newMessage)
  }

}
