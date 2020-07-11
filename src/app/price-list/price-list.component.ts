import { Component, OnInit } from '@angular/core';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PriceList } from '../car/shared/priceList';
import { PricelistService } from './shared/pricelist.service';

@Component({
  selector: 'app-price-list',
  templateUrl: './price-list.component.html',
  styleUrls: ['./price-list.component.css']
})
export class PriceListComponent implements OnInit {
  addModal: NgbModalRef;
  priceList: PriceList;
  priceLists: PriceList[] = [];
  role: string='';
  username: string='';
  mode: string = 'ADD';
  
  constructor(private route: ActivatedRoute,
              private _toastr: ToastrService,
              private router: Router,
              private modalService: NgbModal,
              private priceListService: PricelistService) {
  this.priceList = {
    perDay : 0,
    discount : 0,
    extraKilometrage : 0,
    cdw: 0,
    discountDays: 0,
    id : null,
    userUsername: localStorage.getItem('Username')
  }
}

  ngOnInit(): void {
    this.username  = localStorage.getItem('Username');
    this.role  = localStorage.getItem('User-role');
    this.priceListService.getPriceListsUser(this.username).subscribe(
      data => {
        this.priceLists = data;
      },
      error => {
          this._toastr.error("Error getting price lists", "Price list");
      }
    );
  }

  refresh(){
    this.priceListService.getPriceListsUser(this.username).subscribe(
      data => {
        this.priceLists = data;
      },
      error => {
          this._toastr.error("Error getting price lists", "Price list");
      }
    );
  }

  clear(){
    this.priceList.cdw = 0;
    this.priceList.discount = 0;
    this.priceList.perDay = 0;
    this.priceList.discountDays = 0;
    this.priceList.extraKilometrage = 0;
    this.priceList.userUsername = this.username;
    this.priceList.id = null;
  }

  addPriceList(content){
    this.clear();
    this.refresh();
    this.mode = 'ADD';
    this.addModal = this.modalService.open(content,{size: 'lg'});
  }

  add(){
    if(this.priceList.cdw == 0 || this.priceList.perDay == 0 || this.priceList.extraKilometrage == 0 ){
      this._toastr.info("Please fill per day, cdw and extra kilometrage", "Price list");
      return;
    }

      this.priceListService.createPriceList(this.priceList).subscribe(
        data => {
          this._toastr.success("Price list succesfully created", "Price list");
          this.clear();
          this.refresh();
          this.addModal.close();
        },
        error => {
            this._toastr.error("Error creating price list", "Price list");
        }
      );
  }

  editPriceList(content, priceList){
      this.priceList = priceList;
      this.mode = 'EDIT';
      this.addModal = this.modalService.open(content,{size: 'lg'});
  }

  save(){
    if(this.priceList.cdw == 0 || this.priceList.perDay == 0 || this.priceList.extraKilometrage == 0 ){
      this._toastr.info("Please fill per day, cdw and extra kilometrage", "Price list");
      return;
    }

      this.priceListService.editPriceList(this.priceList).subscribe(
        data => {
          this._toastr.success("Price list succesfully edited", "Price list");
          this.clear();
          this.refresh();
          this.addModal.close();
          this.mode = 'ADD';
        },
        error => {
            this._toastr.error("Error editing price list", "Price list");
        }
      )
      
  }

}
