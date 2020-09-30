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

  public transform(): void {
    console.log(this.sortingMethod);
  }

  private initFilmsList(): void {
    this.filmsList = this.filmsService.initFilms();
  }

  public setFavorite(count: boolean): void {
    count === true ? this.favoriteFilmsCounter++ : this.favoriteFilmsCounter--;
  }

}
