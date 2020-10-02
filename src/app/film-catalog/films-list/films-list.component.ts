import { Component, OnInit } from '@angular/core';

import { FilmService } from '../services/film.service';
import { FilmInterface } from '../interfaces/film.interface';


@Component({
  selector: 'exp-films-list',
  templateUrl: './films-list.component.html',
  styleUrls: ['./films-list.component.scss']
})
export class FilmsListComponent implements OnInit {

  public filmsList: FilmInterface[];
  public sortingMethod: number;
  public favoriteFilmsCounter = 0;


  constructor(private filmsService: FilmService) {
  }

  public ngOnInit(): void {
    this.initFilmsList();
  }

  public transform(value): FilmInterface[] {
    const direction = !!parseInt(value, 10) ? -1 : 1;
    return this.filmsList.sort((a: FilmInterface, b: FilmInterface) => direction * (a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1));
  }

  private initFilmsList(): void {
    this.filmsList = this.filmsService.initFilms();
  }

  public setFavorite(count: boolean): void {
    count ? this.favoriteFilmsCounter++ : this.favoriteFilmsCounter--;
  }

}
