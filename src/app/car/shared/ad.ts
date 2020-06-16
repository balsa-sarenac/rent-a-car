import { Car } from './car';

export interface Ad {
    car: Car,
    cdwAvailable: boolean;
    pickUpPlace: String;
    fromDate: Date;
    toDate: Date;
    allowedKilometrage: Number;
    priceListId: Number;
}