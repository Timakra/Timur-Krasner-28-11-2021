import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { WeatherLocation } from '../../models/weather.model';
import { selectFavorites } from '../../state/reducers/weather.reducer';

@Component({
  selector: 'app-favorite-locations',
  templateUrl: './favorite-locations.component.html',
  styleUrls: ['./favorite-locations.component.scss'],
})
export class FavoriteLocationsComponent implements OnInit,OnDestroy {
  favorites: WeatherLocation[] = [];
  subs : Subscription[] = [];
  constructor(private store: Store) {}

  ngOnInit(): void {
    let selectFavsSub = this.store.select(selectFavorites).subscribe((favs) => {
      this.favorites = favs;
    });
    this.subs.push(selectFavsSub);
  }
  ngOnDestroy(){
    this.subs.forEach(sub=>sub.unsubscribe());
  }
}
