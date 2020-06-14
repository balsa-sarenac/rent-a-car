import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Model } from './model';
import { CarClass } from './carclass';
import { Fuel } from './fuel';
import { Gearbox } from './gearbox';
import { Mark } from './mark';
import { environment } from 'src/environments/environment';


@Injectable()
export class CarService {
  constructor(private http: HttpClient) { }

  getModels() {
    return this.http.get<Model[]>(environment.api + "/car/model/all");
  }

  getMarks() {
    return this.http.get<Mark[]>(environment.api + "/car/mark/all");
  }

  getGearboxes() {
    return this.http.get<Gearbox[]>(environment.api + "/car/gearbox/all");
  }

  getFuels() {
    return this.http.get<Fuel[]>(environment.api + "/car/fuel/all");
  }

  getCarClasses() {
    return this.http.get<CarClass[]>(environment.api + "/car/carclass/all");
  }

}