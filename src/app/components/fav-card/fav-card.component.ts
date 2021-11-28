import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-fav-card',
  templateUrl: './fav-card.component.html',
  styleUrls: ['./fav-card.component.scss']
})
export class FavCardComponent implements OnInit {
  @Input() locationId! : string;
  constructor() { }

  ngOnInit(): void {
  }

}
