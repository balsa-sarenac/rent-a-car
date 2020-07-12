import { Component, OnInit } from '@angular/core';
import { CarInfo } from '../shared/carInfo';
import { Fuel } from '../shared/fuel';
import { Gearbox } from '../shared/gearbox';
import { CarClass } from '../shared/carclass';
import { CarService } from '../shared/car.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';

@Component({
  selector: 'app-edit-car',
  templateUrl: './edit-car.component.html',
  styleUrls: ['./edit-car.component.css']
})
export class EditCarComponent implements OnInit {
  car: CarInfo;
  fuels: Fuel[];
  gearboxes: Gearbox[];
  carClasses: CarClass[];
  car_id: number;
  private sub: any;
  average_grade: number;
 

  constructor(private carService: CarService,
              private route: ActivatedRoute,
              private router: Router,
              private _toastr: ToastrService,
              private _location: Location) { }

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.sub = this.route.params.subscribe(params => {
      this.car_id = +params['id'];});

    this.carService.getCarById(this.car_id)
      .subscribe((data: CarInfo) => {
        this.car = data;
        this.average_grade = this.car.overallGrade / this.car.numberGrades;
      });

    this.carService.getCarGearboxes()
      .subscribe((data: Gearbox[]) => this.gearboxes = data);

    this.carService.getCarFuels()
      .subscribe((data: Fuel[]) => this.fuels = data);

    this.carService.getCarCarClasses()
      .subscribe((data: CarClass[]) => this.carClasses = data);

  }

  onSubmit(): void {
    this.carService.editCar(this.car).subscribe(
      data =>{
        this._toastr.success("Car successfully updated","Car");
        this._location.back();
      }
    );
  }

  back() {
    this._location.back();
  }

}
