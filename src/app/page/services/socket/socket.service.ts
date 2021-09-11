import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Subscription } from 'rxjs';
import { Resp } from '../../../shared/models/Resp.model';
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

  /**
   * Emit the messages to the back
   */
  newMessage(message: SendMessage): void {
    this.socket.emit('new-message', message);
  }

  /**
   * Listen to messages from a specific room and before listening, check if there was already a previous instance to unsubscribe
   */
  listenMessage(): void {
    !!this.subscriptionListenMessage &&
      this.subscriptionListenMessage.unsubscribe();
    this.subscriptionListenMessage = this.socket
      .fromEvent<Resp<Message>>(`message-${this.room}`)
      .subscribe((resp: Resp<Message>) => {
        if (!resp.error) {
          this.messages.push(resp.data);
        }
      });
  }

  /**
   * listen to notifications for the logged in user
   */
  listenNotification(userId: string) {
    return this.socket.fromEvent<Resp<string>>(`notification-${userId}`);
  }

  /**
   * listen to error for the logged in user
   */
  listenError() {
    return this.socket.fromEvent<Resp<string>>(`error`);
  }
}
