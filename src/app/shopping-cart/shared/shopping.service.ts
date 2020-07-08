import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ICart } from './icart.cart';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ShoppingService {

  constructor(private httpClient: HttpClient) { }

  rentCars(cart: ICart) {
    return this.httpClient.post<ICart>(environment.api + "/request", cart);
  }

}
