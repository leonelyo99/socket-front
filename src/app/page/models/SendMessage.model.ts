import { User } from '../../shared/models/User.model';

export class SendMessage {
    constructor (
        public message: string,
        public room: string,
        public user: User
    ) { }

}
