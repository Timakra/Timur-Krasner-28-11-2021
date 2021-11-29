import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { switchUnit } from 'src/app/state/actions/weather.actions';
import { selectTempUnit } from 'src/app/state/reducers/weather.reducer';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  unit!: "C"|"F";
  constructor(private store: Store) { }

  ngOnInit(): void {
    this.store.select(selectTempUnit).subscribe(unit=>{
      this.unit = unit;
    })
  }
  switchUnit(){
    this.store.dispatch(switchUnit())
  }
}
