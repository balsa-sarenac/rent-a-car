import { Component, OnInit } from '@angular/core';
import { CarInfo } from '../shared/carInfo';
import { CarService } from '../shared/car.service';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})
export class CarsComponent implements OnInit {
  cars: CarInfo[];
  username: string;

  constructor(private carService: CarService) { }

  ngOnInit(): void {
    this.username = localStorage.getItem("Username");

    this.carService.getCarsByUser(this.username).subscribe(
      (data: CarInfo[]) => this.cars = data,
      err => console.error('Error in getting all cars by user\'s username: ' + this.username)
    );
  }

}
