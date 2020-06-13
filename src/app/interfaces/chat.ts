import { Message } from './message';
import { User } from './user';

export interface Chat {
    messages: Message[],
    owner: User,
    companion: User
}