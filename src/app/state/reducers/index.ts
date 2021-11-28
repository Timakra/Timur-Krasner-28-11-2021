import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../../environments/environment';
import { weatherReducer } from './weather.reducer';

export interface State {

}

export const reducers: ActionReducerMap<State> = {
  weather: weatherReducer
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
