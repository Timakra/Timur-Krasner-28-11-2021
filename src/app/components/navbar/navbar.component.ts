import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { switchUnit ,switchTheme} from '../../state/actions/weather.actions';
import { selectTempUnit, selectTheme } from '../../state/reducers/weather.reducer';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit,OnDestroy {
  unit!: 'C' | 'F';
  theme!: 'light-theme'|'dark-theme';
  subs :Subscription[]= [];
  constructor(private store: Store,public router :Router) {

  }

  ngOnInit(): void {
    let tempUnitSub = this.store.select(selectTempUnit).subscribe((unit) => {
      this.unit = unit;
    });
    let themeSub = this.store.select(selectTheme).subscribe((theme) => {
      this.theme = theme;
    });

    this.subs.push(themeSub,tempUnitSub);
  }
  switchUnit() {
    this.store.dispatch(switchUnit());
  }
  switchTheme(){
    this.store.dispatch(switchTheme())
  }
  ngOnDestroy(){
    this.subs.forEach(sub=>sub.unsubscribe());
  }
}
