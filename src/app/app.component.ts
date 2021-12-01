import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectErrorMsg, selectSelectedChanged, selectTheme } from './state/reducers/weather.reducer';
import { changeSelectedLocation, userLocationLoaded } from './state/actions/weather.actions'
import { WeatherapiService } from './services/weatherapi.service';
import { Subscription, timeout } from 'rxjs';
import { ErrorMsg } from './models/app.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy {
  theme : "dark-theme" | "light-theme" = "light-theme";
  title = 'Herolo Weather';
  locationChanged : boolean = false;
  errorDisplayDuration :number = 5000;
  subs: Subscription[] = [];
  errorMsg: string = '';
  displayError: boolean = false;
  msgDisplayTimer!: any;

  constructor(private store : Store,private weatherApi : WeatherapiService){
    let selectedThemeSub = this.store.select(selectTheme).subscribe(theme=>{
      this.theme = theme;
    })
    //follows if selected location got changed
    let selectedChangeSub = this.store.select(selectSelectedChanged).subscribe((changed)=>{
      this.locationChanged = changed;
      if(this.locationChanged){
        selectedChangeSub.unsubscribe();
      }
    })

    let errorSub = this.store.select(selectErrorMsg).subscribe((errorMsg)=>{
      if(!errorMsg?.msg) return;
      clearTimeout(this.msgDisplayTimer)
      this.errorMsg = errorMsg.msg;
      this.displayError = true;
      this.msgDisplayTimer = setTimeout(()=>{
        this.displayError = false;
      },this.errorDisplayDuration)
    })

    this.subs.push(selectedChangeSub,selectedThemeSub,selectedChangeSub,errorSub);

    //Gets user location
    navigator.geolocation.getCurrentPosition((loc)=>{
      console.log(loc.coords);
      this.weatherApi.getLocationByGeo(loc).subscribe(location=>{
        if(this.locationChanged) return;
        this.store.dispatch(changeSelectedLocation(location));
      })
    },()=>{
    //  User not allowed
    },{timeout:10000})
  }

  ngOnDestroy(){
    clearTimeout(this.msgDisplayTimer);
    this.subs.forEach(sub=>{
      sub.unsubscribe();
    })
  }
}
