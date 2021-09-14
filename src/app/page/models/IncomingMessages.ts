import { Message } from './Message.model';

export interface IncomingMessages {
  messages: Message[];
  room: string;
}
