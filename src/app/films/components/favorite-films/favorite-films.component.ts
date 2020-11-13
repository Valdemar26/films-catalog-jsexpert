import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { FilmListInterface } from '../../interfaces/film-list.interface';
import { FavoriteFilmsService } from '../../services/favorite-films.service';
import { FilmService } from '../../services/film.service';

@Component({
  selector: 'exp-favorite-films',
  templateUrl: './favorite-films.component.html',
  styleUrls: ['./favorite-films.component.scss']
})
export class FavoriteFilmsComponent implements OnInit {
  public imagePath = 'https://image.tmdb.org/t/p/w500';

  public filmListArray: FilmListInterface[] = [];

  constructor(
    private favoriteFilmsService: FavoriteFilmsService,
    private filmService: FilmService
  ) { }

  public ngOnInit(): void {
    // TODO get favorite films from LS?
    // console.log('init');
    // this.filmService.getFilmList.subscribe((films: FilmListInterface[]) => console.log('films: ', films));
    //
    // if (localStorage.getItem('filmListArray')) {
    //   this.filmListArray = JSON.parse(localStorage.getItem('filmListArray'));
    //   console.log(this.filmListArray);
    // }
  }

  public removeFromFavoriteFilms(film: FilmListInterface): void {
    this.favoriteFilmsService.removeFromFavoriteFilms(film);
  }

  public get getFilmsList(): Observable<FilmListInterface[]> {
    return this.filmService.getFilmList;
  }


}
