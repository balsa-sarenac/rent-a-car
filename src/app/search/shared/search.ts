import { Mark } from 'src/app/car/shared/mark';
import { Model } from 'src/app/car/shared/model';
import { Fuel } from 'src/app/car/shared/fuel';
import { Gearbox } from 'src/app/car/shared/gearbox';
import { CarClass } from 'src/app/car/shared/carclass';

export interface Search {
      pickUpPlace: string;
      fromDate: Date;
      toDate: Date;
      mark: Mark;
      model: Model;
      fuel: Fuel;
      gearbox: Gearbox;
      carClass: CarClass;
      priceFrom: number;
      priceTo: number;
      kilometrageFrom: number;
      kilometrageTo: number;
      kilometrageDrive: number;
      cdw: boolean;
      numberOfChildSeats: number;
}