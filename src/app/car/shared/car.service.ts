import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Model } from './model';
import { CarClass } from './carclass';
import { Fuel } from './fuel';
import { Gearbox } from './gearbox';
import { Mark } from './mark';


@Injectable()
export class CarService {
  constructor(private http: HttpClient) { }

  getModels() {
    return this.http.get<Model[]>("http://localhost:8086/car/model/all");
  }

  getMarks() {
    return this.http.get<Mark[]>("http://localhost:8086/car/mark/all");
  }

  getGearboxes() {
    return this.http.get<Gearbox[]>("http://localhost:8086/car/gearbox/all");
  }

  getFuels() {
    return this.http.get<Fuel[]>("http://localhost:8086/car/fuel/all");
  }

  getCarClasses() {
    return this.http.get<CarClass[]>("http://localhost:8086/car/carclass/all");
  }

}