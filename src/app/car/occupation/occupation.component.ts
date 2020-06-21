import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { OccupationService } from '../shared/occupation.service';
import { CarService } from '../shared/car.service';
import { CarInfo } from '../shared/carInfo';

@Component({
  selector: 'app-occupation',
  templateUrl: './occupation.component.html',
  styleUrls: ['./occupation.component.css']
})
export class OccupationComponent implements OnInit {
  newOccupationForm;
  cars : CarInfo[];

  constructor(private formBuilder: FormBuilder,
              private occupationService: OccupationService,
              private carService: CarService) {
    this.newOccupationForm = this.formBuilder.group({
      dateFrom: '',
      dateTo: '',
      carId: -1
    });
   }


  ngOnInit(): void {
    this.getData();
  }

  onSubmit(userData) {
    let occupation: any = {
        fromDate: userData.fromDate,
        toDate: userData.toDate,
        carId: userData.carId
    };
    this.occupationService.setOccupied(userData).subscribe();
    this.newOccupationForm.reset();
  }

  getData(){
    this.carService.getCarsByUser().subscribe((data: CarInfo[]) => this.cars = data);
  }

}
