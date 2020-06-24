import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homepage-users',
  templateUrl: './homepage-users.component.html',
  styleUrls: ['./homepage-users.component.css']
})
export class HomepageUsersComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  logout(){
    localStorage.removeItem("User-token");
    localStorage.removeItem("Expires-in");
    localStorage.removeItem("Username");
    localStorage.removeItem("User-role");
    localStorage.removeItem("Refresh-token");
    this.router.navigate(['unregistredHomepage']);
  }

}
