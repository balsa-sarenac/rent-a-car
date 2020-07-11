import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PriceList } from 'src/app/car/shared/priceList';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PricelistService {

  constructor(private http: HttpClient) { }

  createPriceList(priceList: PriceList) {
    return this.http.post<any>(environment.api + "/car/priceList", priceList);
    //return this.http.post<any>("http://localhost:8080/priceList", priceList);
  }

  editPriceList(priceList: PriceList) {
    return this.http.patch<any>(environment.api + "/car/priceList" ,{id: priceList.id,
                                                                    cdw: priceList.cdw,
                                                                    extraKilometrage: priceList.extraKilometrage,
                                                                    discount: priceList.discount,
                                                                    discountDays: priceList.discountDays,
                                                                    userUsername: priceList.userUsername,
                                                                    perDay: priceList.perDay});
   /* return this.http.patch<any>("http://localhost:8080/priceList", {id: priceList.id,
                                                                    cdw: priceList.cdw,
                                                                    extraKilometrage: priceList.extraKilometrage,
                                                                    discount: priceList.discount,
                                                                    discountDays: priceList.discountDays,
                                                                    userUsername: priceList.userUsername,
                                                                    perDay: priceList.perDay});*/
  }


  getPriceListsUser(username: string) {
    return this.http.get<any>(environment.api + "/car/priceList/" + username);
    //return this.http.get<any>("http://localhost:8080/priceList/" + username );
  }

}
