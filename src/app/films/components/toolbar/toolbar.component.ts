import { Component, OnInit } from '@angular/core';
import {FilmInterface} from '../../../film-catalog/interfaces/film.interface';

@Component({
  selector: 'exp-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  public filmsList: FilmInterface[];
  public sortingMethod: number;
  public favoriteFilmsCounter = 0;

  constructor() { }

  ngOnInit(): void {
  }

  public transform(value): FilmInterface[] {
    const direction = !!parseInt(value, 10) ? -1 : 1;
    return this.filmsList.sort((a: FilmInterface, b: FilmInterface) => direction * (a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1));
  }

  public setFavorite(count: boolean): void {
    count ? this.favoriteFilmsCounter++ : this.favoriteFilmsCounter--;
  }

}
