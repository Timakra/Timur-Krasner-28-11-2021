import { Component, Input, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-five-day-forecast',
  templateUrl: './five-day-forecast.component.html',
  styleUrls: ['./five-day-forecast.component.scss'],
})
export class FiveDayForecastComponent implements OnInit {
  loading: boolean = true;
  locationIsFav: boolean = false;
  location!: WeatherLocation;
  fiveDayForecast!: Forecast[];
  currentWeather!: Forecast;
  date: string = Date.now().toString();

  constructor(private store: Store, private weatherApi: WeatherapiService) {}

  ngOnInit(): void {
    this.store.select(selectSelectedLocation).subscribe((loc) => {
      this.location = loc;

      //get current weather
      this.weatherApi
        .getCurrentWeather(this.location.id)
        .subscribe((currentWeather) => {
          this.currentWeather = currentWeather;
        });

      //gets 5 day forecast
      this.weatherApi
        .getWeatherFiveDayForecast(this.location.id)
        .subscribe((forecast) => {
          this.fiveDayForecast = forecast;
          this.loading = false;
        });

      // Checks if location is in Favorites
      this.store.select(isInFavorites(this.location.id)).subscribe((inFavs) => {
        this.locationIsFav = inFavs;
      });
    });
  }

  toggleFavorites() {
    if (this.locationIsFav) {
      this.store.dispatch(removeFavorite(this.location));
    } else {
      this.store.dispatch(addFavorite(this.location));
    }
  }
}
