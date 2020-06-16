import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Model } from './model';
import { CarClass } from './carclass';
import { Fuel } from './fuel';
import { Gearbox } from './gearbox';
import { Mark } from './mark';
import { environment } from 'src/environments/environment';
import { Ad } from './ad';
import { Car } from './car';


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

  postNewAd(userData) {
    console.log(userData);
    let car: Car = {
      markId: userData.markId,
      modelId: userData.modelId,
      fuelId: userData.fuelId,
      gearboxId: userData.gearboxId,
      carClassId: userData.carClassId,
      images: userData.images,
      kilometrage: userData.kilometrage,
      numberOfChildSeats: userData.numberOfChildSeats,
      userId: -1
    };
    console.log(car);
    let adDTO: Ad = {
      car: car,
      cdwAvailable: userData.cdw,
      allowedKilometrage: userData.allowedKilometrage,
      fromDate: userData.fromDate,
      toDate: userData.toDate,
      pickUpPlace: userData.pickUpPlace,
      priceListId: userData.priceListId
    }
    console.log(adDTO);
    return this.http.post<Ad>(environment.api, adDTO);
  }

}