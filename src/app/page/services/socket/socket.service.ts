import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root',
})
export class SocketService {

  public room: string = '';
  public messages: any[] = [];

  constructor(private socket: Socket) {}

  newMessage(message) {
    console.log("mensaje enviado")
    console.log(message)
    this.socket.emit('newMessage', message);
  }

  listenMessage(room){
    return this.socket.fromEvent<any>(`message-${room}`);
  }

  listenNotification(userId){
    console.log(`notification-${userId}`)
    return this.socket.fromEvent<any>(`notification-${userId}`);
  }
}
