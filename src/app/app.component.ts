import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'rent-a-car';
  role: string = localStorage.getItem('User-role');

  ngOnInit(): void {
    localStorage.setItem('User-role', 'ROLE_AGENT');
  }

  change() {
    if (localStorage.getItem('User-role') == 'ROLE_USER')
      localStorage.setItem('User-role', 'ROLE_AGENT');
    else
      localStorage.setItem('User-role', 'ROLE_USER');
    this.role = localStorage.getItem('User-role');
  }
}
