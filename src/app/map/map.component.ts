import { Component, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  subscription: Subscription;
  intervalId: number;
  position : [number, number] = [44.751952, 21.600739];

  constructor() { }

  ngOnInit(): void {
    const source = interval(10000);
    this.subscription = source.subscribe(val => this.getPosition());
  }

  getPosition(){
      this.position = [this.position[0] + 0.5, this.position[1] + 0.5]
      console.log(this.position);
  }

  ngOnDestroy() {
    this.subscription && this.subscription.unsubscribe();
  }

}
