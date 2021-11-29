import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Forecast, WeatherLocation } from 'src/app/models/weather.model';
import { WeatherapiService } from 'src/app/services/weatherapi.service';
import { changeSelectedLocation } from 'src/app/state/actions/weather.actions';

@Component({
  selector: 'app-fav-card',
  templateUrl: './fav-card.component.html',
  styleUrls: ['./fav-card.component.scss']
})
export class FavCardComponent implements OnInit {
  @Input() location! : WeatherLocation;
  currentForecast! :Forecast;
  constructor(private weatherApi: WeatherapiService,private store : Store,private router : Router) { }

  ngOnInit(): void {
    this.weatherApi.getCurrentWeather(this.location.id).subscribe((forecast)=>{
      this.currentForecast = forecast;
    })
  }

  routeToMain(){
    this.store.dispatch(changeSelectedLocation(this.location));
    this.router.navigate(['']);
  }
}
