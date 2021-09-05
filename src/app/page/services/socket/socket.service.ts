import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  incomingMessage = this.socket.fromEvent<any>('message');

  constructor(private socket: Socket) { }

  newMessage(message) {
    this.socket.emit('newMessage', message);
  }
}