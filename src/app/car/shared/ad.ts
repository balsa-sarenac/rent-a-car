import { Car } from './car';

export interface Ad {
    id: number,
    carDTO: Car,
    cdwAvailable: boolean;
    pickUpPlace: String;
    fromDate: Date;
    toDate: Date;
    allowedKilometrage: Number;
    priceListId: Number;
}