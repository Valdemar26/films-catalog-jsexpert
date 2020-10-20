import { Component, OnInit } from '@angular/core';

import { FilmService } from '../../services/film.service';
import { FilmListInterface } from '../../interfaces/film-list.interface';

@Component({
  selector: 'exp-favorite-films',
  templateUrl: './favorite-films.component.html',
  styleUrls: ['./favorite-films.component.scss']
})
export class FavoriteFilmsComponent implements OnInit {

  public favoriteFilmsList: FilmListInterface[] = [];
  public imagePath = 'https://image.tmdb.org/t/p/w500';

  constructor(
    private filmService: FilmService
  ) { }

  ngOnInit(): void {
    this.initFavoriteFilmsList();
  }

  private initFavoriteFilmsList(): void {
    this.favoriteFilmsList = JSON.parse(localStorage.getItem('favoriteFilmsList'));
  }

  public removeFromFavoriteFilms(film: FilmListInterface): void {
    console.log('remove: ', film);
    // localStorage.removeItem(JSON.stringify(film));
  }
}
