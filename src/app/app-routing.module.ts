import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ChatComponent } from './chat/chat.component';
import { RequestsComponent } from "./requests/requests.component";
import { NewCarComponent } from "./car/new-car/new-car.component";
import { CarComponent } from "./car/car.component";
import { CommentComponent } from './comment/comment.component';
import { PastRequestsComponent } from './requests/past-requests/past-requests.component';
import { StatisticsComponent } from './car/statistics/statistics.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'chat', component: ChatComponent },
  { path: 'requests', component: RequestsComponent },
  { path: 'past-requests', component: PastRequestsComponent },
  { path: 'car/:id', component: CarComponent },
  { path: 'new-car', component: NewCarComponent },
  { path: 'comments', component: CommentComponent },
  { path: 'statistics', component: StatisticsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), NgbModule],
  exports: [RouterModule],
})
export class AppRoutingModule { }
