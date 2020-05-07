import { Component, OnInit } from '@angular/core';
import { IRequest } from './irequest.request';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class RequestsComponent implements OnInit {
  requests: IRequest[] = [];
  constructor() { }

  ngOnInit(): void {
    this.requests.push({ date: '01/01/2020', car: 'Neko', status: 'PENDING' });
    this.requests.push({ date: '01/02/2020', car: 'Drugo', status: 'PENDING' });
  }

}
