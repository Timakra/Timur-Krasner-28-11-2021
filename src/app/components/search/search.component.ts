import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { WeatherapiService } from '../../services/weatherapi.service';
import { FormBuilder, Validators } from '@angular/forms';
import { WeatherLocation } from '../../models/weather.model';
import { map } from 'rxjs';

import { changeSelectedLocation } from './../../state/actions/weather.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  @ViewChild('searchBox') searchBox!: ElementRef;

  constructor(
    private weatherApi: WeatherapiService,
    private fb: FormBuilder,
    private store: Store
  ) {}
  inputHasString: boolean = false;
  currentQueryString: string = '';
  currentQueryResults: WeatherLocation[] = [];

  search = this.fb.control('', [
    Validators.pattern('[a-zA-Z ]+'), // takes only english alphabetic charcters and start with a letter
  ]);

  ngOnInit(): void {
    this.search.valueChanges.subscribe((value) => {
      if (value) {
        this.inputHasString = true;
      } else {
        this.inputHasString = false;
      }
    });
  }

  searchLocation(e: Event) {
    e.preventDefault();
    console.log('SUBMIT');
    let queryString: string = this.search.value;
    //removes spaces around the string and double(or more) spaces
    let trimmedQuery = queryString
      .trim()
      .split(' ')
      .filter((str) => str)
      .join(' ');
    if (trimmedQuery && this.search.valid) {
      this.queryAutoComplete(trimmedQuery)
        .subscribe((locations) => {
          this.currentQueryResults = locations;
          this.currentQueryString = trimmedQuery;
        })
        .unsubscribe();
    }
  }

  queryAutoComplete(query: string) {
    return this.weatherApi.getAutoComplete(query).pipe(
      map((response) => {
        if (response.error) {
          console.log(response.error);
        }
        //Extracts the locationid and name from response
        return response.map((location: any) => {
          return {
            id: location.Key,
            name: `${location.LocalizedName} ,${location.Country.LocalizedName}`,
          };
        });
      })
    );
  }

  selectLocation(location: WeatherLocation) {
    this.store.dispatch(changeSelectedLocation(location));
    this.search.setValue(location.name);

    //Unfocus from search box
    this.searchBox.nativeElement.focus();
    this.searchBox.nativeElement.blur();
  }

  displayLocationName(location: WeatherLocation): string {
    return location && location.name ? location.name : '';
  }
}
