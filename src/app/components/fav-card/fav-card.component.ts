import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { WeatherLocation } from 'src/app/models/weather.model';
import { changeSelectedLocation } from 'src/app/state/actions/weather.actions';

@Component({
  selector: 'app-fav-card',
  templateUrl: './fav-card.component.html',
  styleUrls: ['./fav-card.component.scss']
})
export class FavCardComponent implements OnInit {
  @Input() location! : WeatherLocation;
  constructor(private store : Store,private router : Router) { }

  ngOnInit(): void {
  }

  routeToMain(){
    console.log("route to main")
    this.store.dispatch(changeSelectedLocation(this.location));
    this.router.navigate(['']);
  }
}
