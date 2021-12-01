import { OnDestroy, Pipe, PipeTransform } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { selectTempUnit } from '../state/reducers/weather.reducer';
/*
 * pipe the degrees by state unit ( C | F)
*/
@Pipe({name: 'tempeture',pure:false})
export class TemperaturePipe implements PipeTransform,OnDestroy {
    //the default unit from server is Fernhite
    unit : "C"|"F" = "F" ;
    subs : Subscription[] = [];
    constructor(private store :Store){
        let selectTempUnitSub = this.store.select(selectTempUnit).subscribe((unit)=>{
            this.unit = unit;
        })
        this.subs.push(selectTempUnitSub);
    }
  transform(value: number): string {
    switch(this.unit){
        case "C":
            return `${((value-32) * 5/9).toFixed(0)}°C`;
        case "F":
            return `${value}°F`;
    }
  }
  ngOnDestroy(){
    this.subs.forEach(sub=>sub.unsubscribe());
  }
}