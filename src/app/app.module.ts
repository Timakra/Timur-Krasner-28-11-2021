import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

// Material
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

//Store
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './state/reducers';

//Components
import { FavoriteLocationsComponent } from './components/favorite-locations/favorite-locations.component';
import { SearchComponent } from './components/search/search.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DailyForecastCardComponent } from './components/daily-forecast-card/daily-forecast-card.component';
import { HomeComponent } from './components/home/home.component';
import { FiveDayForecastComponent } from './components/five-day-forecast/five-day-forecast.component';
import { FavCardComponent } from './components/fav-card/fav-card.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    NavbarComponent,
    DailyForecastCardComponent,
    FavoriteLocationsComponent,
    HomeComponent,
    FiveDayForecastComponent,
    FavCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    StoreModule.forRoot(reducers, {
      metaReducers
    }),
    BrowserAnimationsModule,
    MatAutocompleteModule,
    MatInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
