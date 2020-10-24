import {Component, OnInit} from '@angular/core';

import { Observable } from 'rxjs';

import { FilmListInterface } from '../../interfaces/film-list.interface';
import { FavoriteFilmsService } from '../../services/favorite-films.service';

@Component({
  selector: 'exp-favorite-films',
  templateUrl: './favorite-films.component.html',
  styleUrls: ['./favorite-films.component.scss']
})
export class FavoriteFilmsComponent implements OnInit {
  public imagePath = 'https://image.tmdb.org/t/p/w500';

  constructor(
    private favoriteFilmsService: FavoriteFilmsService
  ) { }

  public ngOnInit(): void {
    console.log(JSON.parse(localStorage.getItem('favoriteFilmsList')));

    // TODO favoriteService.getFilmListFromLS
    // check if have favorite films and get
    // from service or LS
  }

  public removeFromFavoriteFilms(film: FilmListInterface): void {
    this.favoriteFilmsService.removeFromFavoriteFilms(film);
  }

  public get getFavoriteFilmsList(): Observable<FilmListInterface[]> {
    return this.favoriteFilmsService.getFavoriteFilmsArray();
  }
}
