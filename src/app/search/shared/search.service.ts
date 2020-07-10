import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Search } from './search';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient) { }

  searchAds(search: Search, page: number, sort: string) {
    return this.http.post<any>(environment.api + "/search/ad/search/"+ page+"/"+sort, search);
    //return this.http.post<any>("http://localhost:8080/ad/search/"+ page+"/"+sort, search);
  }
}
