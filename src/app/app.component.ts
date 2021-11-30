import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectSelectedChanged, selectTheme } from './state/reducers/weather.reducer';
import { userLocationLoaded } from './state/actions/weather.actions'
import { WeatherapiService } from './services/weatherapi.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  theme : "dark-theme" | "light-theme" = "light-theme";
  title = 'Herolo Weather';
  constructor(private store : Store,private weatherApi : WeatherapiService){
    this.store.select(selectTheme).subscribe(theme=>{
      this.theme = theme;
    })

    //Gets user location
    navigator.geolocation.getCurrentPosition((loc)=>{
      this.weatherApi
    },()=>{
    //  User not allowed
    },{timeout:10000})
  }
}
