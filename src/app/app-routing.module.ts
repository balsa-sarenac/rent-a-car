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
import { StatisticsComponent } from './car/statistics/statistics.component';
import { HomepageUsersComponent } from './homepage/homepage-users/homepage-users.component';
import { HomepageAdminComponent } from './homepage/homepage-admin/homepage-admin.component';
import { HomepageUnregistredComponent } from './homepage/homepage-unregistred/homepage-unregistred.component';
import { SearchComponent } from './search/search.component';
import { UsersComponent } from './auth/users/users.component';
import { CommentAndGradeComponent } from './comment-and-grade/comment-and-grade.component';
import { PriceListComponent } from './price-list/price-list.component';
import { ProfileComponent } from './auth/profile/profile.component';
import { BillComponent } from './bill/bill.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { RegistrationRequestComponent } from './auth/registration-request/registration-request.component';
import { CarsComponent } from './car/cars/cars.component';
import { EditCarComponent } from './car/edit-car/edit-car.component';
import { ReceivedRequestsComponent } from './requests/received-requests/received-requests.component';



const routes: Routes = [
  { path: '', redirectTo: 'unregistredHomepage', pathMatch: 'full' },
  {
    path: 'unregistredHomepage', component: HomepageUnregistredComponent,
    children: [
      { path: '', redirectTo: 'search', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      { path: 'car/:id', component: CarComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'search', component: SearchComponent }
    ]
  },
  {
    path: 'usersHomepage', component: HomepageUsersComponent,
    children: [
      { path: '', redirectTo: 'chat', pathMatch: 'full' },
      { path: 'chat', component: ChatComponent },
      { path: 'search', component: SearchComponent },
      { path: 'requests', component: RequestsComponent },
      { path: 'priceList', component: PriceListComponent },
      { path: 'received-requests', component: ReceivedRequestsComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'bill', component: BillComponent },
      { path: 'ad/:id', component: CarComponent },
      { path: 'new-car', component: NewCarComponent },
      { path: 'statistics', component: StatisticsComponent },
      { path: 'commentsAndGrades', component: CommentAndGradeComponent },
      { path: 'occupation', component: OccupationComponent },
      { path: 'cars', component: CarsComponent },
      { path: 'car/:id', component: EditCarComponent },
      { path: 'cart', component: ShoppingCartComponent }
    ]
  },
  {
    path: 'adminHomepage', component: HomepageAdminComponent,
    children: [
      { path: '', redirectTo: 'comments', pathMatch: 'full' },
      { path: 'comments', component: CommentComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'users', component: UsersComponent },
      { path: 'requests', component: RegistrationRequestComponent }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes), NgbModule],
  exports: [RouterModule],
})
export class AppRoutingModule { }
