import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { switchUnit ,switchTheme} from '../../state/actions/weather.actions';
import { selectTempUnit, selectTheme } from '../../state/reducers/weather.reducer';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  unit!: 'C' | 'F';
  theme!: 'light-theme'|'dark-theme';
  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.select(selectTempUnit).subscribe((unit) => {
      this.unit = unit;
    });
    this.store.select(selectTheme).subscribe((theme) => {
      this.theme = theme;
    });
  }
  switchUnit() {
    this.store.dispatch(switchUnit());
  }
  switchTheme(){
    this.store.dispatch(switchTheme())
  }
}
