import { Component, OnInit } from '@angular/core';
import { Mark } from '../car/shared/mark';
import { Model } from '../car/shared/model';
import { Gearbox } from '../car/shared/gearbox';
import { CarClass } from '../car/shared/carclass';
import { Fuel } from '../car/shared/fuel';
import { CarService } from '../car/shared/car.service';
import { Search } from './shared/search';
import { ToastrService } from 'ngx-toastr';
import { SearchService } from './shared/search.service';
import { Ad } from '../car/shared/ad';
import { AdInfo } from '../car/shared/adInfo';
import { Router, ActivatedRoute } from '@angular/router';
import { IComment } from '../comment/shared/comment';
import { CommentService } from '../comment/shared/comment.service';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  marks: Mark[];
  models: Model[];
  gearboxes: Gearbox[];
  classes: CarClass[];
  fuels: Fuel[];
  search: Search;
  ads: AdInfo[] = [];
  role: string = '';
  cities: string[];
  pages: number[];
  viewModal: NgbModalRef;
  sortSelected: string = 'Sort by';
  ad: AdInfo;
  comments: IComment[];
  
  constructor(private carService: CarService,
              private route: ActivatedRoute,
              private _toastr: ToastrService,
              private searchService: SearchService,
              private router: Router,
              private modalService: NgbModal,
              private commentService: CommentService) {
    this.search = {
    cdw :false,
    kilometrageDrive : 0,
    kilometrageFrom : 0,
    kilometrageTo : 0,
    numberOfChildSeats : 0,
    priceFrom : 0,
    priceTo : 0,
    carClass : {
      id: null,
      name: ''
    },
    fuel : {
      id: null,
      type: ''
    },
    gearbox : {
      id: null,
      type: ''
    },
    model : {
      id: null,
      name: '',
    },
    mark : {
      id: null,
      name: '',
      models: null
    },
    pickUpPlace : '',
    fromDate : null,
    toDate : null
    };
   }

  ngOnInit(): void {
    this.getData();
    this.role = localStorage.getItem("User-role");
  }

  getData() {
    this.carService.getModels()
      .subscribe((data: Model[]) => this.models = data);
    this.carService.getMarks()
      .subscribe((data: Mark[]) => this.marks = data);
    this.carService.getGearboxes()
      .subscribe((data: Gearbox[]) => this.gearboxes = data);
    this.carService.getFuels()
      .subscribe((data: Fuel[]) => this.fuels = data);
    this.carService.getCarClasses()
      .subscribe((data: CarClass[]) => this.classes = data);
    this.carService.getCities()
      .subscribe((data: string[]) => this.cities = data);
  }

  clear(){
    this.search.cdw = false;
    this.search.kilometrageDrive = 0;
    this.search.kilometrageFrom = 0;
    this.search.kilometrageTo = 0;
    this.search.numberOfChildSeats = 0;
    this.search.priceFrom = 0;
    this.search.priceTo = 0;
    this.search.carClass = {id: null, name: ''};
    this.search.fuel = {id: null, type: ''};
    this.search.gearbox = {id: null, type: ''};
    this.search.model = {id: null, name: ''};
    this.search.mark = {id: null, name: '', models: null};
    this.search.pickUpPlace = '';
    this.search.fromDate = null;
    this.search.toDate = null;
  }

  clearAdditional(){
    this.search.cdw = false;
    this.search.kilometrageDrive = 0;
    this.search.kilometrageFrom = 0;
    this.search.kilometrageTo = 0;
    this.search.numberOfChildSeats = 0;
    this.search.priceFrom = 0;
    this.search.priceTo = 0;
    this.search.carClass = {id: null, name: ''};
    this.search.fuel = {id: null, type: ''};
    this.search.gearbox = {id: null, type: ''};
    this.search.model = {id: null, name: ''};
    this.search.mark = {id: null, name: '', models: null};
    this.searchAds(0);
  }
  
  searchAds(page: number){
      if(this.search.pickUpPlace == '' || this.search.fromDate == null || this.search.toDate == null){
          this._toastr.info('Please fill place, date from and date to','Search');
          return;
      }

      this.searchService.searchAds(this.search,page,this.sortSelected).subscribe(
        data => {
            this.ads = data;
            this.pages = [];
            for (let i = 1; i <= this.ads[0].pages; i++) {
              this.pages[i - 1] = i;
            }
            if(this.ads.length > 0){
              this._toastr.success('Search succesfully eneded','Search');
            }else{
              this._toastr.info('No results found','Search');
            }
        },
        error =>{
          if(error.status == 400){
            this._toastr.info('Dates are not valid','Search');
          }else{
            this._toastr.error('Error during search', 'Search');
          }
        }
      );
  }

  view(content, ad: AdInfo){
    this.carService.getOneAd(ad.id).subscribe(
      data => {
        this.ad = data;
        this.commentService.getCommentsForCar(this.ad.car.id).subscribe(
          data => {
            this.comments = data
          }
        );
      }
    );

    this.viewModal = this.modalService.open(content, { size: 'lg', scrollable: true });
  }

  sort(){
    this.searchAds(0);
  }

}
