import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ChatComponent } from './chat/chat.component';
import { RequestsComponent } from './requests/requests.component';
import { NewCarComponent } from './car/new-car/new-car.component';
import { CarComponent } from './car/car.component';
import { OccupationComponent } from './car/occupation/occupation.component';

import { ConfigService } from './config/config.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ChatComponent,
    RequestsComponent,
    NewCarComponent,
    CarComponent,
    OccupationComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule, ReactiveFormsModule],
  providers: [ConfigService],
  bootstrap: [AppComponent],
})
export class AppModule { }
