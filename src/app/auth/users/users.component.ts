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

  delete(id: number){
    this.authService.deleteUser(id).subscribe(
      data=>{
        this._toastr.success("User successfully deleted", "Delete");
        this.refresh();
      },
      error=>{
        this._toastr.error("Error", "Delete");
      }
    );
  }

  disableRent(id: number){
    this.authService.disableEnableRent(id, false).subscribe(
      data=>{
        this._toastr.success("User successfully disabled for renting", "Rent");
        this.refresh();
      },
      error=>{
        this._toastr.error("Error", "Rent");
      }
    );
  }

  checkPrivilege(roles: string[]){
      if(roles.indexOf('PRIVILEGE_RENT') > -1)
          return true;
      else
          return false;
  }

  enableRent(id: number){
    this.authService.disableEnableRent(id, true).subscribe(
      data=>{
        this._toastr.success("User successfully enabled for renting", "Rent");
        this.refresh();
      },
      error=>{
        this._toastr.error("Error", "Rent");
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
