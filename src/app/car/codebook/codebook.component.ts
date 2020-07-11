import { Component, OnInit, ViewChild } from '@angular/core';
import { Mark } from './shared/mark.car';
import { Model } from './shared/model.car';
import { Fuel } from './shared/fuel.car';
import { Gearbox } from './shared/gearbox.car';
import { Carclass } from './shared/carclass.car';
import { ToastrService } from 'ngx-toastr';
import { CodebookService } from './shared/codebook.service';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';


@Component({
  selector: 'app-codebook',
  templateUrl: './codebook.component.html',
  styleUrls: ['./codebook.component.css']
})
export class CodebookComponent implements OnInit {
  @ViewChild('closebuttonmark') closebuttonMark;
  @ViewChild('closebuttonmodel') closebuttonModel;
  @ViewChild('closebuttonfuel') closebuttonFuel;
  @ViewChild('closebuttongearbox') closebuttonGearbox;
  @ViewChild('closebuttoncarclass') closebuttonCarclass;

  marks: Mark[] = [];
  models: Model[] = [];
  fuels: Fuel[] = [];
  gearboxes: Gearbox[] = [];
  carclasses: Carclass[] = [];
  nameForm: FormGroup;
  typeForm: FormGroup;
  modelForm: FormGroup;
  markForm: FormGroup;
  fuelForm: FormGroup;

  edit: boolean = false;


  constructor(private _toastr: ToastrService, private codebookService: CodebookService, private formBuilder: FormBuilder) {
    this.nameForm = this.formBuilder.group({ id: '', name: '' });
    this.typeForm = this.formBuilder.group({ id: '', type: '' });
    this.modelForm = this.formBuilder.group({ id: '', name: '', markId: -1 })
    this.markForm = this.formBuilder.group({ id: '', name: '' });
    this.fuelForm = this.formBuilder.group({ id: '', type: '' });
  }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.codebookService.getMarks().subscribe(
      (data: Mark[]) => this.marks = data,
      error => this._toastr.error("Error while retrieving marks", "Error")
    );
    this.codebookService.getModels().subscribe(
      (data: Model[]) => this.models = data,
      error => this._toastr.error("Error while retrieving models", "Error")
    );
    this.codebookService.getFuels().subscribe(
      (data: Fuel[]) => this.fuels = data,
      error => this._toastr.error("Error while retrieving fuels", "Error")
    );
    this.codebookService.getGearboxes().subscribe(
      (data: Gearbox[]) => this.gearboxes = data,
      error => this._toastr.error("Error while retrieving gearboxes", "Error")
    );
    this.codebookService.getCarClasses().subscribe(
      (data: Carclass[]) => this.carclasses = data,
      error => this._toastr.error("Error while retrieving car classes", "Error")
    );
  }

  nameSubmit(value) {
    console.log(value);
    if (this.edit) {
      this.codebookService.changeMark(value).subscribe(
        () => this._toastr.success("Mark changed", "Success"),
        error => this._toastr.error("Error while changing mark", "Error")
      );
    } else {
      this.codebookService.postNewMark(value).subscribe(
        () => this._toastr.success("Mark created", "Success"),
        error => this._toastr.error("Error while saving mark", "Error")
      );
    }
    this.closebuttonMark.nativeElement.click();
    this.getData();
  }

  modelSubmit(value) {
    console.log(value);
    this.marks.forEach(element => {
      if (element.id == value.markId) {
        console.log(element);
        value.mark = element;
      }
    });
    if (this.edit) {
      this.codebookService.changeModel(value).subscribe(
        () => this._toastr.success("Model changed", "Success"),
        error => this._toastr.error("Error while changing model", "Error")
      );
    } else {
      this.codebookService.postNewModel(value).subscribe(
        () => this._toastr.success("Model created", "Success"),
        error => this._toastr.error("Error while saving model", "Error")
      );
    }
    this.closebuttonModel.nativeElement.click();
    this.getData();
  }

  fuelSubmit(value) {
    console.log(value);
    if (this.edit) {
      this.codebookService.changeFuel(value).subscribe(
        () => this._toastr.success("Fuel changed", "Success"),
        error => this._toastr.error("Error while changing fuel", "Error")
      );
    } else {
      this.codebookService.postNewFuel(value).subscribe(
        () => this._toastr.success("Fuel created", "Success"),
        error => this._toastr.error("Error while saving fuel", "Error")
      );
    }
    this.closebuttonFuel.nativeElement.click();
    this.getData();
  }

  gearboxSubmit(value) {
    console.log(value);
    if (this.edit) {
      this.codebookService.changeGearbox(value).subscribe(
        () => this._toastr.success("Gearbox changed", "Success"),
        error => this._toastr.error("Error while changing gearbox", "Error")
      );
    } else {
      this.codebookService.postNewGearbox(value).subscribe(
        () => this._toastr.success("Gearbox created", "Success"),
        error => this._toastr.error("Error while saving gearbox", "Error")
      );
    }
    this.closebuttonGearbox.nativeElement.click();
    this.getData();
  }

  carclassSubmit(value) {
    console.log(value);
    if (this.edit) {
      this.codebookService.changeCarclass(value).subscribe(
        () => this._toastr.success("Car class changed", "Success"),
        error => this._toastr.error("Error while changing car class", "Error")
      );
    } else {
      this.codebookService.postNewCarclass(value).subscribe(
        () => this._toastr.success("Car class created", "Success"),
        error => this._toastr.error("Error while saving car class", "Error")
      );
    }
    this.closebuttonCarclass.nativeElement.click();
    this.getData();
  }

  setMark(mark: Mark) {
    this.markForm.setControl('name', new FormControl(mark.name));
    this.markForm.setControl('id', new FormControl(mark.id));
    this.edit = true;
  }

  setModel(model: Model) {
    this.modelForm.setControl('name', new FormControl(model.name));
    this.modelForm.setControl('id', new FormControl(model.id));
    this.modelForm.setControl('markId', new FormControl(model.mark.id));
    this.edit = true;
  }

  setFuel(fuel: Fuel) {
    this.fuelForm.setControl('type', new FormControl(fuel.type));
    this.fuelForm.setControl('id', new FormControl(fuel.id));
    this.edit = true;
  }

  setGearbox(gearbox: Gearbox) {
    this.typeForm.setControl('type', new FormControl(gearbox.type));
    this.typeForm.setControl('id', new FormControl(gearbox.id));
    this.edit = true;
  }

  setCarclass(carclass: Carclass) {
    this.nameForm.setControl('name', new FormControl(carclass.name));
    this.nameForm.setControl('id', new FormControl(carclass.id));
    this.edit = true;
  }

  newNotEdit() {
    this.edit = false;
    this.nameForm.setControl('name', new FormControl(''));
    this.nameForm.setControl('id', new FormControl(-1));
    this.typeForm.setControl('type', new FormControl(''));
    this.typeForm.setControl('id', new FormControl(-1));
    this.modelForm.setControl('name', new FormControl(''));
    this.modelForm.setControl('id', new FormControl(-1));
    this.modelForm.setControl('markId', new FormControl(-1));
  }


  deleteMark(mark) {
    this.codebookService.deleteMark(mark).subscribe(
      () => {
        this._toastr.success("Mark deleted", "Success");
        this.marks.splice(this.marks.indexOf(mark), 1);
      },
      error => this._toastr.error("Error while deleting mark", "Error")
    );
  }

  deleteModel(model) {
    this.codebookService.deleteModel(model).subscribe(
      () => {
        this._toastr.success("Model deleted", "Success");
        this.models.splice(this.models.indexOf(model), 1);
      },
      error => this._toastr.error("Error while deleting model", "Error")
    );
  }

  deleteFuel(fuel) {
    this.codebookService.deleteFuel(fuel).subscribe(
      () => {
        this._toastr.success("Fuel deleted", "Success");
        this.fuels.splice(this.fuels.indexOf(fuel), 1);
      },
      error => this._toastr.error("Error while deleting fuel", "Error")
    );
  }

  deleteGearbox(gearbox) {
    this.codebookService.deleteGearbox(gearbox).subscribe(
      () => {
        this._toastr.success("Gearbox deleted", "Success");
        this.gearboxes.splice(this.gearboxes.indexOf(gearbox), 1);
      },
      error => this._toastr.error("Error while deleting gearbox", "Error")
    );
  }

  deleteCarclass(carclass) {
    this.codebookService.deleteCarclass(carclass).subscribe(
      () => {
        this._toastr.success("Carclass deleted", "Success");
        this.carclasses.splice(this.carclasses.indexOf(carclass), 1);
      },
      error => this._toastr.error("Error while deleting carclass", "Error")
    );
  }
}
