import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/car/shared/user';
import { AuthService } from '../shared/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: User[];
  constructor(private authService: AuthService,
              private _toastr: ToastrService) { }

  ngOnInit(): void {
    this.authService.getUsers().subscribe(
      data=>{
        this.users = data;
      }
    );
  }

  refresh(){
    this.authService.getUsers().subscribe(
      data=>{
        this.users = data;
      }
    );
  }

  disable(id: number){
    this.authService.disableUser(id).subscribe(
      data=>{
        this._toastr.success("User successfully disabled", "Disable");
        this.refresh();
      },
      error=>{
        this._toastr.error("Error", "Disable");
      }
    );
  }

  enable(id: number){
    this.authService.enableUser(id).subscribe(
      data=>{
        this._toastr.success("User successfully enabled", "Enable");
        this.refresh();
      },
      error=>{
        this._toastr.error("Error", "Enable");
      }
    );
  }
}
