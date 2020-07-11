import { Component, OnInit } from '@angular/core';
import { CarService } from '../shared/car.service';
import { CarInfo } from '../shared/carInfo';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})
export class CarsComponent implements OnInit {
  cars: CarInfo[];
  username: string;

  constructor(private carService: CarService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.username = localStorage.getItem("Username");

    this.carService.getCarsByUser(this.username).subscribe(
      (data: CarInfo[]) => this.cars = data,
      err => console.error('Error in getting all cars by user\'s username: ' + this.username)
    );
  }

  editCar(car: CarInfo): void {
    this.router.navigate(['car', car.id],{relativeTo: this.route.parent});
  }

}
