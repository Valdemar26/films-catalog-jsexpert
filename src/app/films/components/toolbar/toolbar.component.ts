import { Component, OnInit } from '@angular/core';

import { FilmInterface } from '../../../film-catalog/interfaces/film.interface';
import { DataService } from '../../../services/data.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'exp-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  public filmsList: FilmInterface[];
  public sortingMethod: number;
  public favoriteFilmsCounter = 0;



  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.checkFavoriteFilms;
  }

  get checkFavoriteFilms(): Subscription {
    return this.dataService.getFavoriteFilm().subscribe( (count) => this.favoriteFilmsCounter = count);
  }

  public transform(value): FilmInterface[] {
    // const direction = !!parseInt(value, 10) ? -1 : 1;
    // return this.filmsList.sort((a: FilmInterface, b: FilmInterface) => direction * (a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1));

    return this.dataService.sortFilmByTitle(value);
  }

  public searchFilmByTitle() {
    this.dataService.searchFilmByTitle();
  }



}
