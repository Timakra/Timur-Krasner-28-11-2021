import { createReducer, createFeatureSelector, on, createSelector } from "@ngrx/store";
import { WeatherLocation } from "src/app/models/weather.model";

import * as WeatherActions from '../actions/weather.actions';

export interface State {
    favorites : string[];
    selectedLocation : WeatherLocation;
}

export const initialState : State = {
    favorites: ['215854', '3453754', '2723742', '300558'],
    selectedLocation: {name:"Tel aviv ,Israel",id:"215854"}
}

//Reducer
export const weatherReducer = createReducer(
    initialState,
    on(WeatherActions.addFavorite,
        (state:State,addedLocation:WeatherLocation)=>{
            console.log("reducer:",{...state,favorites:[...state.favorites,addedLocation.id]})
            return {...state,favorites:[...state.favorites,addedLocation.id]}
        }),
    on(WeatherActions.removeFavorite,
        (state:State,removedLocation:WeatherLocation)=>({...state,favorites:state.favorites.filter((favLocation)=>!(favLocation === removedLocation.id))})),
    on(WeatherActions.changeSelectedLocation,
        (state:State,location:WeatherLocation)=>({...state,selectedLocation:location})),
    
)


//Selectors
export const selectWeather = createFeatureSelector<State>('weather');
export const selectSelectedLocation = createSelector(selectWeather,(state:State)=>state.selectedLocation);
export const selectFavorites = createSelector(selectWeather,(state:State)=>state.favorites);
