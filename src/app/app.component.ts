import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectTheme } from './state/reducers/weather.reducer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  theme : "dark-theme" | "light-theme" = "light-theme";
  title = 'Herolo Weather';
  constructor(private store : Store){
    this.store.select(selectTheme).subscribe(theme=>{
      this.theme = theme;
    })
  }
}
