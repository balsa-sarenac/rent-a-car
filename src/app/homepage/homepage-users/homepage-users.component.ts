import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-homepage-users',
  templateUrl: './homepage-users.component.html',
  styleUrls: ['./homepage-users.component.css']
})
export class HomepageUsersComponent implements OnInit {
  role: string = '';
  constructor(private router: Router,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.role = localStorage.getItem("User-role");
  }

  logout() {
    localStorage.removeItem("User-token");
    localStorage.removeItem("Expires-in");
    localStorage.removeItem("Username");
    localStorage.removeItem("User-role");
    localStorage.removeItem("Refresh-token");
    this.router.navigate(['unregistredHomepage']);
    this.toastr.success('Successfully logged out', 'Logout');
  }

  cart() {
    this.router.navigate(['usersHomepage/cart']);
  }

}
