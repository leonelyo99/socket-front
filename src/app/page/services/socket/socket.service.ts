import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Subscription } from 'rxjs';
import { Resp } from '../../models/Resp.model';
import { Message } from '../../models/Message.model';
import { SendMessage } from '../../models/SendMessage.model';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  public room: string = '';
  public messages: Message[] = [];
  public subscriptionListenMessage: Subscription = null;

  constructor(private socket: Socket) {}

  newMessage(message: SendMessage) {
    this.socket.emit('newMessage', message);
  }

  listenMessage() {
    !!this.subscriptionListenMessage && this.subscriptionListenMessage.unsubscribe()
    this.subscriptionListenMessage = this.socket
      .fromEvent<Resp<Message>>(`message-${this.room}`)
      .subscribe((resp: Resp<Message>) => {
        if (!resp.error) {
          this.messages.push(resp.data);
        }
      });
  }

  listenNotification(userId: string) {
    return this.socket.fromEvent<any>(`notification-${userId}`);
  }
}
