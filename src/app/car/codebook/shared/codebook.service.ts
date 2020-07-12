import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Mark } from './mark.car';
import { environment } from 'src/environments/environment';
import { Model } from './model.car';
import { Fuel } from './fuel.car';
import { Gearbox } from './gearbox.car';
import { Carclass } from './carclass.car';
import { FormBuilder } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CodebookService {
  constructor(private http: HttpClient) {
  }

  getMarks() {
    return this.http.get<Mark[]>("http://localhost:8080/mark");
    // return this.http.get<Mark[]>(environment.api + "/car/mark");
  }

  getModels() {
    return this.http.get<Model[]>("http://localhost:8080/model");
    // return this.http.get<Model[]>(environment.api + "/car/model");
  }

  getFuels() {
    return this.http.get<Fuel[]>("http://localhost:8080/fuel");
    // return this.http.get<Fuel[]>(environment.api + "/car/fuel");
  }

  getGearboxes() {
    return this.http.get<Gearbox[]>("http://localhost:8080/gearbox");
    // return this.http.get<Gearbox[]>(environment.api + "/car/gearbox");
  }

  getCarClasses() {
    return this.http.get<Carclass[]>("http://localhost:8080/carclass");
    // return this.http.get<Carclass[]>(environment.api + "/car/carclass");
  }

  postNewMark(mark) {
    return this.http.post("http://localhost:8080/mark", mark);
    // return this.http.post(environment.api + "/car/mark", mark);
  }

  postNewModel(model) {
    return this.http.post("http://localhost:8080/model", model);
    // return this.http.post(environment.api + "/car/model", model);
  }

  postNewFuel(fuel) {
    return this.http.post("http://localhost:8080/fuel", fuel);
    // return this.http.post(environment.api + "/car/fuel", fuel);
  }

  postNewGearbox(gearbox) {
    return this.http.post("http://localhost:8080/gearbox", gearbox);
    // return this.http.post(environment.api + "/car/gearbox", gearbox);
  }

  postNewCarclass(carclass) {
    return this.http.post("http://localhost:8080/carclass", carclass);
    // return this.http.post(environment.api + "/car/carclass", carclass);
  }

  changeMark(mark) {
    return this.http.put("http://localhost:8080/mark", mark);
    // return this.http.put(environment.api + "/car/mark", mark);
  }

  changeModel(model) {
    return this.http.put("http://localhost:8080/model", model);
    // return this.http.put(environment.api + "/car/model", model);
  }

  changeFuel(fuel) {
    return this.http.put("http://localhost:8080/fuel", fuel);
    // return this.http.put(environment.api + "/car/fuel", fuel);
  }

  changeGearbox(gearbox) {
    return this.http.put("http://localhost:8080/gearbox", gearbox);
    // return this.http.put(environment.api + "/car/gearbox", gearbox);
  }

  changeCarclass(carclass) {
    return this.http.put("http://localhost:8080/carclass", carclass);
    // return this.http.put(environment.api + "/car/carclass", carclass);
  }

  deleteMark(mark) {
    return this.http.delete("http://localhost:8080/mark/", mark.id);
    // return this.http.delete(environment.api + "/car/mark/" + mark.id);
  }

  deleteModel(model) {
    return this.http.delete("http://localhost:8080/model/", model.id);
    // return this.http.delete(environment.api + "/car/model/" + model.id);
  }

  deleteFuel(fuel) {
    return this.http.delete("http://localhost:8080/fuel/", fuel.id);
    // return this.http.delete(environment.api + "/car/fuel/" + fuel.id);
  }

  deleteGearbox(gearbox) {
    return this.http.delete("http://localhost:8080/gearbox/", gearbox.id);
    // return this.http.delete(environment.api + "/car/gearbox/" + gearbox.id);
  }

  deleteCarclass(carclass) {
    return this.http.delete("http://localhost:8080/carclass/", carclass.id);
    // return this.http.delete(environment.api + "/car/carclass/" + carclass.id);
  }
}
