import { Component, OnInit } from '@angular/core';

export interface Industry {
  text: string;
  cols: number;
  rows: number
}


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: [ './home.component.css' ],
})

export class HomeComponent {
  loggedIn: boolean;

  industries: Industry[] = [
    {text: "IT", cols: 1, rows: 1},
    {text: "Økonomi", cols: 1, rows: 1},
    {text: "Bygg", cols: 1, rows: 1},
    {text: "Markedsføring", cols: 1, rows: 1},
    {text: "Lærer", cols: 1, rows: 1},
  ]
}