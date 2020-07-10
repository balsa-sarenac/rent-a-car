import { Component, OnInit } from '@angular/core';
import { CarService } from '../shared/car.service';
import { Fuel } from '../shared/fuel';
import { Gearbox } from '../shared/gearbox';
import { CarClass } from '../shared/carclass';
import { CarInfo } from '../shared/carInfo';
import { ActivatedRoute, Router } from '@angular/router';

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
              private router: Router) { }

  ngOnInit(): void {
    this.getData();

    //document.getElementById("fuel").nodeValue = 
  }

  getData(): void {
    this.sub = this.route.params.subscribe(params => {
      this.car_id = +params['id'];});

    this.carService.getCarById(this.car_id)
      .subscribe((data: CarInfo) => this.car = data);

    this.carService.getGearboxes()
      .subscribe((data: Gearbox[]) => this.gearboxes = data);

    this.carService.getFuels()
      .subscribe((data: Fuel[]) => this.fuels = data);

    this.carService.getCarClasses()
      .subscribe((data: CarClass[]) => this.carClasses = data);

    this.average_grade = this.car.overallGrade / this.car.numberGrades;
  }

  onSubmit(): void {

  }

}
