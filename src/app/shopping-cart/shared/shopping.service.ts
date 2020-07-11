import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ICart } from './icart.cart';
import { environment } from 'src/environments/environment';
import { ICartUsers } from './icarusers.cart';

@Injectable({
  providedIn: 'root'
})
export class ShoppingService {

  constructor(private httpClient: HttpClient) { }

  rentCars(cart: ICart) {
    return this.httpClient.post<ICart>(environment.api + "/request", cart);
  }

  getUsers(cars) {
    return this.httpClient.post<ICartUsers>(environment.api + "/car/ad/users-cars", cars);
  }

}
