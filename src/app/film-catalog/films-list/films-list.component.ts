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

  public transform(): FilmInterface[] {
    this.filmsList.sort((a: FilmInterface, b: FilmInterface) => {
      const x = a.name.toLowerCase();
      const y = b.name.toLowerCase();

      if (x < y) {
        return -1 * this.sortingMethod;
      } else {
        return 1 * this.sortingMethod;
      }
    });
    return this.filmsList;
  }

  private initFilmsList(): void {
    this.filmsList = this.filmsService.initFilms();
  }

  public setFavorite(count: boolean): void {
    count === true ? this.favoriteFilmsCounter++ : this.favoriteFilmsCounter--;
  }

}
