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
import { PriceList } from './priceList';


@Injectable()
export class CarService {
  constructor(private http: HttpClient) { }

  getModels() {
    return this.http.get<Model[]>(environment.api + "/search/model");
    //return this.http.get<any>("http://localhost:8080/model");
  }

  getCities() {
    return this.http.get<any>(environment.api + "/search/ad/city");
    //return this.http.get<any>("http://localhost:8080/ad/city");
  }

  getMarks() {
    return this.http.get<Mark[]>(environment.api + "/search/mark");
    //return this.http.get<any>("http://localhost:8080/mark");
  }

  getGearboxes() {
    return this.http.get<Gearbox[]>(environment.api + "/search/gearbox");
    //return this.http.get<any>("http://localhost:8080/gearbox");
  }

  getFuels() {
    return this.http.get<Fuel[]>(environment.api + "/search/fuel");
    //return this.http.get<any>("http://localhost:8080/fuel");
  }

  getCarClasses() {
    return this.http.get<CarClass[]>(environment.api + "/search/carclass");
    //return this.http.get<any>("http://localhost:8080/carclass");
  }

  getCarsByUser(username: string) {
    return this.http.get<any>(environment.api + "/car/car/user/" + username);
    //return this.http.get<any>("http://localhost:8080/car/user/" + username);
  }

  getOneAd(id: number) {
    // return this.http.get<any>(environment.api + "/search/ad/" + id);
    return this.http.get<any>(environment.api + "/car/ad/" + id);
    //return this.http.get<any>("http://localhost:8080/ad/" + id);
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
      id: -1,
      carDTO: car,
      cdwAvailable: userData.cdw,
      allowedKilometrage: userData.allowedKilometrage,
      fromDate: userData.fromDate,
      toDate: userData.toDate,
      pickUpPlace: userData.pickUpPlace,
      priceListId: userData.priceListId
    }
    console.log(adDTO);
    return this.http.post<Ad>(environment.api + "/car/ad", adDTO);
  }

  getStatistics() {
    let id = localStorage.getItem("Id");
    return this.http.get<any>(environment.api + "/car/car/statistics/" + id);
  }

  getCarModels() {
    return this.http.get<Model[]>(environment.api + "/car/model");
    //return this.http.get<any>("http://localhost:8080/model");
  }

  getCarCities() {
    return this.http.get<any>(environment.api + "/car/ad/city");
    //return this.http.get<any>("http://localhost:8080/ad/city");
  }

  getCarMarks() {
    return this.http.get<Mark[]>(environment.api + "/car/mark");
    //return this.http.get<any>("http://localhost:8080/mark");
  }

  getCarGearboxes() {
    return this.http.get<Gearbox[]>(environment.api + "/car/gearbox");
    //return this.http.get<any>("http://localhost:8080/gearbox");
  }

  getCarFuels() {
    return this.http.get<Fuel[]>(environment.api + "/car/fuel");
    //return this.http.get<any>("http://localhost:8080/fuel");
  }

  getCarCarClasses() {
    return this.http.get<CarClass[]>(environment.api + "/car/carclass");
    //return this.http.get<any>("http://localhost:8080/carclass");
  }

  getPriceLists() {
    return this.http.get<PriceList[]>(environment.api + "/car/priceList/" + localStorage.getItem("Username"));
  }

  getCarById(id: number) {
    //return this.http.get<any>("http://localhost:8080/car/" + id);
    return this.http.get<any>(environment.api + "/car/car/" + id);
  }

}