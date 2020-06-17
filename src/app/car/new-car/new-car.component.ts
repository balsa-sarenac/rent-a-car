import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CarService } from 'src/app/car/shared/car.service';
import { CarClass } from 'src/app/car/shared/carclass';
import { Fuel } from 'src/app/car/shared/fuel';
import { Gearbox } from 'src/app/car/shared/gearbox';
import { Mark } from 'src/app/car/shared/mark';
import { Model } from 'src/app/car/shared/model';
import { MyImage } from '../shared/my-image';

@Component({
  selector: 'app-new-car',
  templateUrl: './new-car.component.html',
  styleUrls: ['./new-car.component.css']
})
export class NewCarComponent implements OnInit {
  newCarForm;
  models: Model[];
  marks: Mark[];
  fuels: Fuel[];
  gearboxes: Gearbox[];
  carClasses: CarClass[];
  imageFiles = [];
  imageURLs: MyImage[] = [];
  selectedMark: Mark;

  constructor(private formBuilder: FormBuilder, private carService: CarService) {
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
      priceListId: -1,
      cdw: false,
      isAllowed: false
    });
  }

  ngOnInit(): void {
    this.getData();
  }

  onSubmit(userData) {
    this.newCarForm.value.images = [];
    // for (var i = 0; i < this.imageFiles.length; i++) {
    // this.newCarForm.value.images.push(this.imageFiles[i]);
    // }
    userData.images = this.imageURLs;
    this.carService.postNewAd(userData).subscribe(() => alert("success!"));
    this.newCarForm.reset();
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
      .subscribe((data: CarClass[]) => this.carClasses = data);

    // pricelist
  }

  markChange() {
    this.marks.forEach(element => {
      if (element.id == this.newCarForm.value.markId) {
        this.selectedMark = element
      }
    });
  }

  fileUpload(event) {
    if (event.target.files && event.target.files[0]) {
      var filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        var reader = new FileReader();

        this.imageFiles.push(event.target.files[i]);
        reader.onload = (event: any) => {
          console.log(event.target.result)
          this.imageURLs.push(event.target.result);
        }

        reader.readAsDataURL(event.target.files[i]);
      }
    }
  }
}