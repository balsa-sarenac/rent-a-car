import { CarInfo } from './carInfo';

export interface AdInfo {
    car: CarInfo,
    cdwAvailable: boolean;
    pickUpPlace: String;
    fromDate: Date;
    toDate: Date;
    allowedKilometrage: Number;
    priceListId: Number;
    id: number;
}