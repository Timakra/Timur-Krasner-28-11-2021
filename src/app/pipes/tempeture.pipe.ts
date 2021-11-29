import { Pipe, PipeTransform } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectTempUnit } from '../state/reducers/weather.reducer';
/*
 * pipe the degrees by state unit ( C | F)
*/
@Pipe({name: 'tempeture',pure:false})
export class TemperaturePipe implements PipeTransform {
    unit : "C"|"F" = "C" ;
    constructor(private store :Store){
        this.store.select(selectTempUnit).subscribe((unit)=>{
            this.unit = unit;
        })
    }
  transform(value: number): string {
    switch(this.unit){
        case "C":
            return `${value}°C`;
        case "F":
            return `${(value * 9/5) + 32}°F`;
    }
  }
}