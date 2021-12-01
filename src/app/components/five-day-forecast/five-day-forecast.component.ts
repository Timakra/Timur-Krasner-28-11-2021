import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Forecast, WeatherLocation } from '../../models/weather.model';
import { WeatherapiService } from '../../services/weatherapi.service';
import {
  isInFavorites,
  selectSelectedLocation,
} from '../../state/reducers/weather.reducer';
import {
  removeFavorite,
  addFavorite,
} from '../../state/actions/weather.actions';
import { catchError, Subscription } from 'rxjs';

@Component({
  selector: 'app-five-day-forecast',
  templateUrl: './five-day-forecast.component.html',
  styleUrls: ['./five-day-forecast.component.scss'],
})
export class FiveDayForecastComponent implements OnInit,OnDestroy {
  loading: boolean = true;
  subs: Subscription[] = [];
  locationIsFav: boolean = false;
  location!: WeatherLocation;
  fiveDayForecast!: Forecast[];
  currentWeather!: Forecast;
  date: string = Date.now().toString();

  constructor(private store: Store, private weatherApi: WeatherapiService) {}

  ngOnInit(): void {
    let selectedLocationSub = this.store.select(selectSelectedLocation).subscribe((loc) => {
      this.location = loc;

      //get current weather
      let currrentWeatherSub = this.weatherApi
        .getCurrentWeather(this.location.id)
        .subscribe({
          next:(currentWeather) => {
          this.currentWeather = currentWeather;
          if(!this.fiveDayForecast) return;
          this.loading = false;
        },
          error:(e)=>{this.loading= false;return e}}
        );

      //gets 5 day forecast
      let fiveDaySub = this.weatherApi
        .getWeatherFiveDayForecast(this.location.id)
        .subscribe({
          next:(forecast) => {
          this.fiveDayForecast = forecast;
          if(!this.currentWeather) return;
          this.loading = false;
          },
          error:(e)=>{this.loading= false;return e}
        });

      // Checks if location is in Favorites
      let inFavSub = this.store.select(isInFavorites(this.location.id)).subscribe((inFavs) => {
        this.locationIsFav = inFavs;
      });
      this.subs.push(currrentWeatherSub,fiveDaySub,inFavSub);

    });
    this.subs.push(selectedLocationSub);

  }

  toggleFavorites() {
    if (this.locationIsFav) {
      this.store.dispatch(removeFavorite(this.location));
    } else {
      this.store.dispatch(addFavorite(this.location));
    }
  }
  ngOnDestroy(){
    this.subs.forEach(sub=>sub.unsubscribe());
  }
}
