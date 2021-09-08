import { Message } from "./Message.model";

export class IncomingMessages {
    constructor (
        public messages: Message[],
        public room: string
    ) { }

}
