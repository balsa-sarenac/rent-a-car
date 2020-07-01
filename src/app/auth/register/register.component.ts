import { Component, OnInit } from '@angular/core';
import { FormBuilder, Form, FormGroup } from '@angular/forms';
import { User } from 'src/app/car/shared/user';
import { AuthService } from '../shared/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm;
  role: string = '';

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private _toastr: ToastrService) {
    this.registerForm = this.formBuilder.group({
      firstName: '',
      lastName: '',
      address: '',
      email: '',
      password: '',
      companyName: '',
      businessID: '',
      username:'',
    });
  }

  ngOnInit(): void { 
    this.role = localStorage.getItem('User-role');
  }

  onSubmit(userData) {
    let user: User ={
      id: null,
      firstName: userData.firstName,
      lastName: userData.lastName,
      username: userData.username,
      companyName: '',
      isAdmin: false,
      enabled: false,
      address: userData.address,
      businessID: '',
      email: userData.email,
      password: userData.password,
      roles: []
    };

    if(this.role == 'ROLE_ADMIN'){
      user.businessID = userData.businessID;
      user.companyName = userData.companyName;
      user.roles.push("ROLE_AGENT");
    }else{
      user.roles.push("ROLE_USER");
    }

    this.authService.register(user).subscribe(
      data=> {
        if(this.role == 'ROLE_ADMIN')
            this._toastr.success("You have succesfully added agent", "Registration");
        else
            this._toastr.success("You have succesfully sent reqistration request", "Registration");

        this.registerForm.reset();

      }, 
      error =>{
        this._toastr.error("Error during registration", "Registration");
      }
    );
    
  }
}
