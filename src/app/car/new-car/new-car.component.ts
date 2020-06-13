import { Component, OnInit } from '@angular/core';
import { FormBuilder, Form, FormGroup } from '@angular/forms';
import { ConfigService } from 'src/app/config/config.service';
import { Model } from 'src/app/interfaces/model';
import { Mark } from 'src/app/interfaces/mark';
import { Fuel } from 'src/app/interfaces/fuel';
import { Gearbox } from 'src/app/interfaces/gearbox';
import { CarClass } from 'src/app/interfaces/carclass';

@Component({
  selector: 'app-new-car',
  templateUrl: './new-car.component.html',
  styleUrls: ['./new-car.component.css']
})
export class NewCarComponent implements OnInit {
  newCarForm;
  models: Model[];
  marks: Model[];
  fuels: Fuel[];
  gearboxes: Gearbox[];
  carClasses: CarClass[];

  constructor(private formBuilder: FormBuilder, private configService: ConfigService) {
    this.newCarForm = this.formBuilder.group({
      markId: -1,
      modelId: -1,
      fuelId: -1,
      gearboxId: -1,
      carClassId: -1,
      kilometrage: 0,
      numberOfChildSeats: 0,
      pickUpPlace: '',
      fromDate: '',
      toDate: '',
      allowedKilometrage: 0,
      priceListId: -1
    });
  }

  ngOnInit(): void {
    this.getData();
  }

  onSubmit(userData) {
    this.newCarForm.reset();
  }

  getData() {
    this.configService.getModels()
      .subscribe((data: Model[]) => this.models = data);
    this.configService.getMarks()
      .subscribe((data: Mark[]) => this.marks = data);
    this.configService.getGearboxes()
      .subscribe((data: Gearbox[]) => this.gearboxes = data);
    this.configService.getFuels()
      .subscribe((data: Fuel[]) => this.fuels = data);
    this.configService.getCarClasses()
      .subscribe((data: CarClass[]) => this.carClasses = data);

    // pricelist
  }

}
