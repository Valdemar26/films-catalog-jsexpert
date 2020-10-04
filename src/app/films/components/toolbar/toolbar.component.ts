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
    return this.dataService.getFavoriteFilm().subscribe( (count) => {
      console.log(count);
      return this.favoriteFilmsCounter = count;
    });
  }

  public transform(value): Subscription {
    return this.dataService.sortFilmByTitle(value);
  }

  public searchFilmByTitle(): void {
    this.dataService.searchFilmByTitle();
  }



}
