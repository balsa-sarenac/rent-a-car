import { Component, OnInit } from '@angular/core';
import { IStatistics } from '../shared/statistics';
import { CarService } from '../shared/car.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
  statistics: IStatistics;

  constructor(private carService: CarService) { }

  ngOnInit(): void {
    this.carService.getStatistics().subscribe(
      (data: IStatistics) => this.statistics = data,
      err => console.error('Error in getting statistics')
    );
    //alert(this.statistics.carWithHighestGrade.markName);
  }

}
