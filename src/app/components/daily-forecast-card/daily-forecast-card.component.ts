import { Component, Input, OnInit } from '@angular/core';
import { Forecast } from 'src/app/models/weather.model';

@Component({
  selector: 'app-daily-forecast-card',
  templateUrl: './daily-forecast-card.component.html',
  styleUrls: ['./daily-forecast-card.component.scss']
})
export class DailyForecastCardComponent implements OnInit {
  

  @Input() forecast! : Forecast;

  constructor() { }

  ngOnInit(): void {
    
  }

}
