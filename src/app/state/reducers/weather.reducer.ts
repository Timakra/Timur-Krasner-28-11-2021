import {
  createReducer,
  createFeatureSelector,
  on,
  createSelector,
} from '@ngrx/store';
import { WeatherLocation } from '../../models/weather.model';

import * as WeatherActions from '../actions/weather.actions';

export interface State {
  favorites: WeatherLocation[];
  selectedLocation: WeatherLocation;
  tempUnit: 'C' | 'F';
  theme : "dark-theme" | "light-theme";
  userLocation? : GeolocationPosition;
  selectedLocationChanged: boolean;
}

export const initialState: State = {
  selectedLocationChanged : false,
  tempUnit: 'C',
  theme: "light-theme",
  favorites: [
    {
      name: 'Tel aviv ,Israel',
      id: '215854',
    },
    {
      id: '169072',
      name: 'Telavi ,Georgia',
    },
    {
      id: '3453754',
      name: 'Telaga Asih ,Indonesia',
    },
    {
      name: 'Tel aviv ,Israel',
      id: '215854',
    },
    {
      id: '169072',
      name: 'Telavi ,Georgia',
    },
    {
      id: '3453754',
      name: 'Telaga Asih ,Indonesia',
    },
    {
      name: 'Tel aviv ,Israel',
      id: '215854',
    },
    {
      id: '169072',
      name: 'Telavi ,Georgia',
    },
    {
      id: '3453754',
      name: 'Telaga Asih ,Indonesia',
    },
    {
      name: 'Tel aviv ,Israel',
      id: '215854',
    },
    {
      id: '169072',
      name: 'Telavi ,Georgia',
    },
    {
      id: '3453754',
      name: 'Telaga Asih ,Indonesia',
    },
  ],
  selectedLocation: { name: 'Tel aviv ,Israel', id: '215854' },
};

//Reducer
export const weatherReducer = createReducer(
  initialState,
  on(
    WeatherActions.addFavorite,
    (state: State, addedLocation: WeatherLocation) => {
      return { ...state, favorites: [...state.favorites, addedLocation] };
    }
  ),
  on(
    WeatherActions.removeFavorite,
    (state: State, removedLocation: WeatherLocation) => ({
      ...state,
      favorites: state.favorites.filter(
        (favLocation) => !(favLocation.id === removedLocation.id)
      ),
    })
  ),
  on(
    WeatherActions.changeSelectedLocation,
    (state: State, location: WeatherLocation) => ({
      ...state,
      selectedLocationChanged: true,
      selectedLocation: location,
    }),
  ),
  on(WeatherActions.userLocationLoaded,(state,loc)=>{
    return {...state,userLocation:loc}
  }),
  on(WeatherActions.switchUnit, (state: State) => ({
    ...state,
    tempUnit: state.tempUnit === 'C' ? 'F' : 'C' as 'C' | 'F',
  })),
  on(WeatherActions.switchTheme, (state: State) => ({
    ...state,
    theme: state.theme === 'light-theme' ? 'dark-theme': 'light-theme'  as "dark-theme" | "light-theme",
  }))
);

//Selectors
export const selectWeather = createFeatureSelector<State>('weather');

export const selectSelectedLocation = createSelector(
  selectWeather,
  (state: State) => state.selectedLocation
);

export const selectSelectedChanged = createSelector(
  selectWeather,
  (state: State) => state.selectedLocationChanged
);

export const selectTempUnit = createSelector(
  selectWeather,
  (state: State) => state.tempUnit
);

export const selectTheme = createSelector(
  selectWeather,
  (state: State) => state.theme
);

export const selectFavorites = createSelector(
  selectWeather,
  (state: State) => state.favorites
);

export const isInFavorites = (id: string) =>
  createSelector(selectWeather, selectFavorites, (state: State, favs) => {
    for (let loc of favs) {
      if (loc.id === id) {
        return true;
      }
    }
    //if its none of the favorite locations
    return false;
  });
