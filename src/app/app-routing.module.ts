import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CarComponent } from './cars/car/car.component';
import { CarDetailsComponent } from './cars/car-details/car-details.component';

const routes: Routes = [
  {
    path: 'car',
    component: CarComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
