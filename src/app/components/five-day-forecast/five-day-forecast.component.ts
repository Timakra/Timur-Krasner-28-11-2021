import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Forecast, WeatherLocation } from 'src/app/models/weather.model';
import { WeatherapiService } from 'src/app/services/weatherapi.service';
import { selectFavorites, selectSelectedLocation } from 'src/app/state/reducers/weather.reducer';
import { removeFavorite,addFavorite } from 'src/app/state/actions/weather.actions'

@Component({
  selector: 'app-five-day-forecast',
  templateUrl: './five-day-forecast.component.html',
  styleUrls: ['./five-day-forecast.component.scss']
})
export class FiveDayForecastComponent implements OnInit {
  loading: boolean = true;
  locationIsFav :boolean = false;
  location! :WeatherLocation;
  fiveDayForecast! : Forecast[];


  constructor(private store :Store,private weatherApi : WeatherapiService) {
  }
  
  ngOnInit(): void {
    this.store.select(selectSelectedLocation).subscribe((loc)=>{
      this.location = loc;

      //gets 5 day forecast
      this.weatherApi.getWeatherFiveDayForecast(this.location.id).subscribe((forecast)=>{
        this.fiveDayForecast = forecast;
        this.loading = false;
      })
      
      // Checks if location is in Favorites
      this.store.select(selectFavorites).subscribe((favs)=>{
        this.locationIsFav = favs.includes(this.location.id);
      })
    })

  }

  toggleFavorites(){
    if(this.locationIsFav){
      this.store.dispatch(removeFavorite(this.location))
    }else{
      this.store.dispatch(addFavorite(this.location))
    }
  }
  

}
