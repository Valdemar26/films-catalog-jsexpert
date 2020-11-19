import { Component } from '@angular/core';

import { Observable } from 'rxjs';

import { FilmListInterface } from '../../interfaces/film-list.interface';
import { FavoriteFilmsService } from '../../services/favorite-films.service';
import { FilmService } from '../../services/film.service';

@Component({
  selector: 'exp-favorite-films',
  templateUrl: './favorite-films.component.html',
  styleUrls: ['./favorite-films.component.scss']
})
export class FavoriteFilmsComponent {
  public imagePath = 'https://image.tmdb.org/t/p/w500';

  public filmListArray: FilmListInterface[] = [];

  constructor(
    private favoriteFilmsService: FavoriteFilmsService,
    private filmService: FilmService
  ) { }

  public removeFromFavoriteFilms(film: FilmListInterface): void {
    this.favoriteFilmsService.removeFromFavoriteFilms(film);
  }

  public get getFilmsList(): Observable<FilmListInterface[]> {
    return this.filmService.getFilmList;
  }
}
