import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Forecast, WeatherLocation } from '../../models/weather.model';
import { WeatherapiService } from '../../services/weatherapi.service';
import { changeSelectedLocation } from '../../state/actions/weather.actions';

@Component({
  selector: 'app-fav-card',
  templateUrl: './fav-card.component.html',
  styleUrls: ['./fav-card.component.scss'],
})
export class FavCardComponent implements OnInit ,OnDestroy{
  
  @Input() location!: WeatherLocation;
  loading: boolean = true;
  currentForecast!: Forecast;
  subs: Subscription[] = [];

  constructor(
    private weatherApi: WeatherapiService,
    private store: Store,
    private router: Router
  ) {}

  ngOnInit(): void {
    let currentWeatherSub = this.weatherApi
      .getCurrentWeather(this.location.id)
      .subscribe({
        next:(forecast) => {
        this.currentForecast = forecast;
        this.loading = false;
      },
        error:(e)=>{this.loading= false;return e}
      });

    this.subs.push(currentWeatherSub);
  }

  routeToMain() {
    this.store.dispatch(changeSelectedLocation(this.location));
    this.router.navigate(['']);
  }

  ngOnDestroy(){
    this.subs.forEach(sub=>sub.unsubscribe());
  }
}
