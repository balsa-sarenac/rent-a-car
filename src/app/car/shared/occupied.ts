import { CarInfo } from './carInfo';

export interface Occupied {
    id: number,
    dateTo: Date,
    dateFrom: Date,
    carId: number,
    car: CarInfo,
    adsId: number[]
}