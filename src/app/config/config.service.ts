import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Model } from '../interfaces/model';
import { Mark } from '../interfaces/mark';
import { Gearbox } from '../interfaces/gearbox';
import { Fuel } from '../interfaces/fuel';
import { CarClass } from '../interfaces/carclass';

@Injectable()
export class ConfigService {
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