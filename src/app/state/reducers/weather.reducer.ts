import { createReducer, createFeatureSelector, on, createSelector } from "@ngrx/store";
import { WeatherLocation } from "src/app/models/weather.model";

import * as WeatherActions from '../actions/weather.actions';

export interface State {
    favorites : WeatherLocation[];
    selectedLocation : WeatherLocation;
    tempUnit: "C"|"F";
}

export const initialState : State = {
    tempUnit: "C",
    favorites: [
        {
            "name": "Tel aviv ,Israel",
            "id": "215854",
        },
        {
            "id": "169072",
            "name": "Telavi ,Georgia",
     
        },
        {
            "id": "3453754",
            "name": "Telaga Asih ,Indonesia",
        }
    ],
    selectedLocation: {name:"Tel aviv ,Israel",id:"215854"}
}

//Reducer
export const weatherReducer = createReducer(
    initialState,
    on(WeatherActions.addFavorite,
        (state:State,addedLocation:WeatherLocation)=>{
            return {...state,favorites:[...state.favorites,addedLocation]}
        }),
    on(WeatherActions.removeFavorite,
        (state:State,removedLocation:WeatherLocation)=>({...state,favorites:state.favorites.filter((favLocation)=>!(favLocation.id === removedLocation.id))})),
    on(WeatherActions.changeSelectedLocation,
        (state:State,location:WeatherLocation)=>({...state,selectedLocation:location})),
    on(WeatherActions.switchUnit,
        (state:State)=>({...state,tempUnit:(state.tempUnit === "C"?"F":"C" as ("C"|"F"))}))
)


//Selectors
export const selectWeather = createFeatureSelector<State>('weather');
export const selectSelectedLocation = createSelector(selectWeather,(state:State)=>state.selectedLocation);
export const selectTempUnit = createSelector(selectWeather,(state:State)=>state.tempUnit);
export const selectFavorites = createSelector(selectWeather,(state:State)=>state.favorites);
export const isInFavorites = (id:string) => createSelector(selectWeather,selectFavorites,(state:State,favs)=>{
    for(let loc of favs){
      if(loc.id === id){
        return true;
      }
    }
    //if its none of the favorite locations
    return false;    
  });
