import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { WeatherLocation } from 'src/app/models/weather.model';
import { selectFavorites } from 'src/app/state/reducers/weather.reducer';

@Component({
  selector: 'app-favorite-locations',
  templateUrl: './favorite-locations.component.html',
  styleUrls: ['./favorite-locations.component.scss']
})
export class FavoriteLocationsComponent implements OnInit {
  favorites : WeatherLocation[] = [];
  constructor(private store :Store) { 
  }

  ngOnInit(): void {
    this.store.select(selectFavorites).subscribe((favs)=>{
      this.favorites = favs;
      console.log(favs)
    })
  }

}
