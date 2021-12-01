import { createAction, props } from '@ngrx/store';
import { ErrorMsg } from 'src/app/models/app.model';
import { WeatherLocation } from '../../models/weather.model';

export const addFavorite = createAction(
  '[Weather] Add Favorite',
  props<WeatherLocation>()
);

export const removeFavorite = createAction(
  '[Weather] Remove Favorite',
  props<WeatherLocation>()
);

export const changeSelectedLocation = createAction(
  '[Weather] Changed Selected Location',
  props<WeatherLocation>()
);

export const userLocationLoaded = createAction(
  '[Weather] User Location Loaded',
  props<GeolocationPosition>()
);


export const switchUnit = createAction('[Weather] Switch Temputere unit');

export const switchTheme = createAction(
  '[App] Switch theme'
);

export const displayError = createAction(
  '[App] Error',
  props<ErrorMsg>()
)