import { Component, OnDestroy } from '@angular/core';

import { Observable, Subscription } from 'rxjs';

import { FilmService } from '../../services/film.service';
import { GenresListInterface } from '../../interfaces/genres-list.interface';
import { FilmListInterface } from '../../interfaces/film-list.interface';
import {FavoriteFilmsService} from '../../services/favorite-films.service';


@Component({
  selector: 'exp-films-list',
  templateUrl: './films-list.component.html',
  styleUrls: ['./films-list.component.scss']
})
export class FilmsListComponent implements OnDestroy {

  private subscription: Subscription = new Subscription();

  constructor(
    private filmService: FilmService,
    private favoriteFilmsService: FavoriteFilmsService
  ) {}

  public get foundedSearchFilm(): Observable<FilmListInterface[]> {
    return this.filmService.foundedSearchFilm;
  }

  public get getGenresList(): Observable<GenresListInterface[]> {
    return this.filmService.getGenresList;
  }

  public setFavoriteFilm(film: FilmListInterface): void {
    this.favoriteFilmsService.setFavoriteFilm(film);
  }

  public loadMoreFilms(): void {
    this.filmService.getMoreFilms();
  }

  public identify(index, item): number {
    return item.id;
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
