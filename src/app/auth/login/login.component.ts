import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm;

  constructor(private formBuilder: FormBuilder,
    private authService: AuthService, 
    private router: Router) {
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
        localStorage.setItem("User-token", data.accessToken);
        localStorage.setItem("Expires-in", data.expiresIn);
        localStorage.setItem("Refresh-token", data.refreshToken);
        localStorage.setItem("Username", data.username);
        localStorage.setItem("User-role", data.role);

        if(data.role == 'ROLE_ADMIN'){
          this.router.navigate(['adminHomepage']);
        }else if(data.role != ''){
          this.router.navigate(['usersHomepage']);
        }
        
      }
    );
    this.loginForm.reset();
  }
}
