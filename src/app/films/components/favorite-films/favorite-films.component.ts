import {Component, OnInit} from '@angular/core';

import { FilmService } from '../../services/film.service';
import { FilmListInterface } from '../../interfaces/film-list.interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'exp-favorite-films',
  templateUrl: './favorite-films.component.html',
  styleUrls: ['./favorite-films.component.scss']
})
export class FavoriteFilmsComponent implements OnInit {
  public imagePath = 'https://image.tmdb.org/t/p/w500';

  constructor(
    private filmService: FilmService
  ) { }

  public ngOnInit(): void {
    console.log(JSON.parse(localStorage.getItem('favoriteFilmsList')));
  }

  public removeFromFavoriteFilms(film: FilmListInterface): void {
    this.filmService.removeFromFavoriteFilms(film);
  }

  public get getFavoriteFilmsList(): Observable<FilmListInterface[]> {
    return this.filmService.getFavoriteFilmsArray();
  }
}
