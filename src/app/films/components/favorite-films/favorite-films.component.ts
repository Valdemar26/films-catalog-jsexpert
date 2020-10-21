import { Component } from '@angular/core';

import { FilmService } from '../../services/film.service';
import { FilmListInterface } from '../../interfaces/film-list.interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'exp-favorite-films',
  templateUrl: './favorite-films.component.html',
  styleUrls: ['./favorite-films.component.scss']
})
export class FavoriteFilmsComponent {
  public imagePath = 'https://image.tmdb.org/t/p/w500';

  constructor(
    private filmService: FilmService
  ) { }

  public removeFromFavoriteFilms(film: FilmListInterface): void {
    this.filmService.removeFromFavoriteFilms(film);
  }

  public get getFavoriteFilmsList(): Observable<FilmListInterface[]> {
    return this.filmService.getFavoriteFilmsArray();
  }
}
