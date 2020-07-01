import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm;

  constructor(private formBuilder: FormBuilder,
    private authService: AuthService, 
    private router: Router,
    private toastr: ToastrService) {
      this.loginForm = this.formBuilder.group({
      username: '',
      password: '',
      });
}

  ngOnInit(): void {}

  onSubmit(userData: Object): void {
    // sent to back-end
    this.authService.login(userData).subscribe(
      data=>{
        localStorage.clear();
        localStorage.setItem("User-token", data.accessToken);
        localStorage.setItem("Expires-in", data.expiresIn);
        localStorage.setItem("Refresh-token", data.refreshToken);
        localStorage.setItem("Username", data.username);
        localStorage.setItem("User-role", data.role);
        this.loginForm.reset();
        
        if(data.role == 'ROLE_ADMIN'){
          this.router.navigate(['adminHomepage']);
        }else if(data.role != ''){
          this.router.navigate(['usersHomepage']);
        }
        this.toastr.success('Successfully logged in', 'Login');
        
      },
      error =>{
        this.toastr.info('Bad credentials', 'Login');
      }
    );
  }
}
