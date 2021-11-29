import { createAction ,props } from "@ngrx/store";
import { WeatherLocation } from "src/app/models/weather.model";


export const addFavorite = createAction(
    "[Weather] Add Favorite",
    props<WeatherLocation>()
);

export const removeFavorite = createAction(
    "[Weather] Remove Favorite",
    props<WeatherLocation>()
);

export const changeSelectedLocation = createAction(
    "[Weather] Changed Selected Location",
    props<WeatherLocation>()
);
export const switchUnit = createAction(
    "[Weather] Switch Temputere unit"
);
