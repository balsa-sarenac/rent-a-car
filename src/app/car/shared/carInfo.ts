import { Model } from './model';
import { Mark } from './mark';
import { Fuel } from './fuel';
import { CarClass } from './carclass';
import { Gearbox } from './gearbox';

export interface CarInfo {
    model: Model;
    mark: Mark;
    fuel: Fuel;
    carClass: CarClass;
    gearbox: Gearbox;
    hasAndroid: boolean;
    kilometrage: Number;
    numberOfChildSeats: Number;
    images: String[];
    id: number;
    overallGrade: number;
    numberGrades: number;

}