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
import { OccupationComponent } from './car/occupation/occupation.component';
import { PastRequestsComponent } from './requests/past-requests/past-requests.component';
import { StatisticsComponent } from './car/statistics/statistics.component';
import { HomepageUsersComponent } from './homepage/homepage-users/homepage-users.component';
import { HomepageAdminComponent } from './homepage/homepage-admin/homepage-admin.component';
import { HomepageUnregistredComponent } from './homepage/homepage-unregistred/homepage-unregistred.component';


const routes: Routes = [
  { path: '', redirectTo: 'unregistredHomepage', pathMatch: 'full' },
  { path: 'unregistredHomepage', component: HomepageUnregistredComponent,
    children:[
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent }
    ]
  },
  { path: 'usersHomepage', component: HomepageUsersComponent,
    children:[
      { path: '', redirectTo: 'chat', pathMatch: 'full' },
      { path: 'chat', component: ChatComponent },
      { path: 'requests', component: RequestsComponent },
      { path: 'past-requests', component: PastRequestsComponent },
      { path: 'car/:id', component: CarComponent },
      { path: 'new-car', component: NewCarComponent },
      { path: 'statistics', component: StatisticsComponent },
      { path: 'occupation', component: OccupationComponent },
    ]
  },
  { path: 'adminHomepage', component: HomepageAdminComponent,
    children:[
      { path: '', redirectTo: 'comments', pathMatch: 'full' },
      { path: 'comments', component: CommentComponent },
    ]
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes), NgbModule],
  exports: [RouterModule],
})
export class AppRoutingModule { }
