
import { User } from 'src/app/car/shared/user';

export interface Bill {
    id: number;
    text: string;
    paid: boolean;
    price: number;
    user: User;
 }
 