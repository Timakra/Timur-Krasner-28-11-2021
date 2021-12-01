import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
//Pipes
import { TemperaturePipe } from './pipes/tempeture.pipe'
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
import { AppInterceptor } from './app.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    NavbarComponent,
    DailyForecastCardComponent,
    FavoriteLocationsComponent,
    HomeComponent,
    FiveDayForecastComponent,
    FavCardComponent,
    TemperaturePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,

    StoreModule.forRoot(reducers, {
      metaReducers
    }),

  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AppInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
