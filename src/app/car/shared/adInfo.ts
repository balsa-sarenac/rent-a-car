import { CarInfo } from './carInfo';
import { PriceList } from './priceList';

export interface AdInfo {
    car: CarInfo,
    cdwAvailable: boolean;
    pickUpPlace: String;
    fromDate: Date;
    toDate: Date;
    allowedKilometrage: Number;
    priceListId: Number;
    priceList: PriceList;
    id: number;
    pages: number;
    userId: number;
    images: string[];
}