import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homepage-admin',
  templateUrl: './homepage-admin.component.html',
  styleUrls: ['./homepage-admin.component.css']
})
export class HomepageAdminComponent implements OnInit {

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
