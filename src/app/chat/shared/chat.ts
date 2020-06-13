import { Message } from './message';
import { User } from '../../car/shared/user';

export interface Chat {
    messages: Message[],
    owner: User,
    companion: User
}