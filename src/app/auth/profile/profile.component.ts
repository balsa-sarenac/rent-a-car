import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/car/shared/user';
import { AuthService } from '../shared/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  role: string = '';
  username: string = '';
  user: User;
  mode: string = 'VIEW';

  constructor(private authService: AuthService,
              private _toastr: ToastrService) { }

  ngOnInit(): void {
    this.role = localStorage.getItem('User-role');
    this.username = localStorage.getItem('Username');
    this.authService.getUser(this.username).subscribe(
      data => {
        this.user = data;
      },
      error => {
        this._toastr.error("error geting user", "User");
      }
    );
  }

  edit(){
    this.mode = 'EDIT';
  }

  cancel(){
    this.authService.getUser(this.username).subscribe(
      data => {
        this.user = data;
      },
      error => {
        this._toastr.error("error geting user", "User");
      }
    );
    this.mode = 'VIEW';
  }

  save(){
    this.authService.editUser(this.user).subscribe(
      data => {
        this._toastr.success("Information successfully updated", "Edit");
        this.mode = 'VIEW';
      },
      error => {
        this._toastr.error("Error editing user", "Edit user");
      }
    );
  }
}
