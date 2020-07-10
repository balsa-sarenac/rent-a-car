import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { UserRequest } from '../shared/user.regreq';

@Component({
  selector: 'app-registration-request',
  templateUrl: './registration-request.component.html',
  styleUrls: ['./registration-request.component.css']
})
export class RegistrationRequestComponent implements OnInit {
  users: UserRequest[];

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.getRegistrationRequests().subscribe((data: UserRequest[]) => this.users = data);
  }

  approve(user: UserRequest) {
    this.authService.approveRequest(user.id).subscribe((data) => alert("approved"));
    let index = this.users.indexOf(user);
    this.users.splice(index, 1);
  }

  refuse(user: UserRequest) {
    this.authService.refuseRequest(user.id).subscribe((data) => alert("refused"));
    let index = this.users.indexOf(user);
    console.log(index);
    this.users.splice(index, index);
    console.log(this.users, 1);
  }

}
