import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { OccupationService } from '../shared/occupation.service';
import { CarService } from '../shared/car.service';
import { CarInfo } from '../shared/carInfo';
import { ToastrService } from 'ngx-toastr';
import { Occupied } from '../shared/occupied';

@Component({
  selector: 'app-occupation',
  templateUrl: './occupation.component.html',
  styleUrls: ['./occupation.component.css']
})
export class OccupationComponent implements OnInit {
  newOccupationForm;
  cars : CarInfo[];
  occupations: Occupied[];
  selectedOccupation: Occupied;

  constructor(private formBuilder: FormBuilder,
              private occupationService: OccupationService,
              private carService: CarService,
              private _toastr: ToastrService) {
    this.selectedOccupation = {
      dateFrom: null,
      dateTo: null,
      carId: -1,
      id: null,
      car: null,
      adsId: null
    };
   }


  ngOnInit(): void {
    this.occupationService.getOccupations(localStorage.getItem('Username')).subscribe(
      data =>{
        this.occupations = data;
      },
      error =>{
        this._toastr.error('Error getting occupations', 'Occupations');
      }
    );
    this.getData();
  }

  refresh(){
    this.occupationService.getOccupations(localStorage.getItem('Username')).subscribe(
      data =>{
        this.occupations = data;
      },
      error =>{
        this._toastr.error('Error getting occupations', 'Occupations');
      });
  }

  create() {
    if(this.selectedOccupation.dateFrom == undefined || this.selectedOccupation.dateTo == undefined || this.selectedOccupation.dateTo == null ||this.selectedOccupation.dateFrom == null || this.selectedOccupation.carId == -1){
      this._toastr.info('Please fill date to, date from and car','Occupation');
      return;
    }

    this.occupationService.setOccupied(this.selectedOccupation).subscribe(
      data=>{
        this._toastr.success("Occupation succesfully created", "Occupation");
        this.selectedOccupation.carId = -1;
        this.selectedOccupation.dateFrom = null;
        this.selectedOccupation.dateTo = null;
        this.refresh();
      },
      error =>{
        if(error.status == 400){
          this._toastr.info('Dates are not valid','Occupation');
        }else if(error.status == 409) {
          this._toastr.warning('Car is already rented for that period', 'Occupation');
        }else{
        this._toastr.error("Error setting occupation", "Occupation");
        }
      }
    );
    
  }

  getData(){
    this.carService.getCarsByUser(localStorage.getItem('Username')).subscribe(
      (data: CarInfo[]) => this.cars = data,
      error => this._toastr.error("Error getting cars", "Cars"));
  }
  

}
