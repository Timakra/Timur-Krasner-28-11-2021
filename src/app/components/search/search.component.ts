import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { WeatherapiService } from '../../services/weatherapi.service';
import { FormBuilder, Validators } from '@angular/forms';
import { WeatherLocation } from '../../models/weather.model';
import { map, Subscription } from 'rxjs';

import { changeSelectedLocation, displayError } from './../../state/actions/weather.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit,OnDestroy {
  @ViewChild('searchBox') searchBox!: ElementRef;

  constructor(
    private weatherApi: WeatherapiService,
    private fb: FormBuilder,
    private store: Store
  ) {}
  inputHasString: boolean = false;
  currentQueryString: string = '';
  currentQueryResults: WeatherLocation[] = [];
  loading: boolean = false;
  subs :Subscription[] = [];
  search = this.fb.control('', [
    Validators.pattern('[a-zA-Z ]+'), // takes only english alphabetic charcters and start with a letter
  ]);

  ngOnInit(): void {
    let searchFieldSub = this.search.valueChanges.subscribe((value) => {
      if (value) {
        this.inputHasString = true;
      } else {
        this.inputHasString = false;
      }
      if(this.inputHasString && this.search.invalid){
        this.store.dispatch(displayError({msg:"Enter a location using only English letters"}))
      }
    });
    this.subs.push(searchFieldSub);
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
      this.loading = true;
      let querySub = this.weatherApi.getAutoComplete(trimmedQuery)
        .subscribe({
          next:(locations) => {
          this.currentQueryResults = locations;
          this.currentQueryString = trimmedQuery;
          this.loading = false;
        },
          error:(e)=>{this.loading= false;return e}
        })
        this.subs.push(querySub);
    }

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

  ngOnDestroy(){
    this.subs.forEach(sub=>sub.unsubscribe());
  }
}
