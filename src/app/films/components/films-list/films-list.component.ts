import { Component, OnDestroy, OnInit } from '@angular/core';

import { Observable, Subscription } from 'rxjs';


import { FilmService } from '../../services/film.service';
import { GenresListInterface } from '../../interfaces/genres-list.interface';
import { FilmListInterface } from '../../interfaces/film-list.interface';


@Component({
  selector: 'exp-films-list',
  templateUrl: './films-list.component.html',
  styleUrls: ['./films-list.component.scss']
})
export class FilmsListComponent implements OnInit, OnDestroy {

  public genresList = [];

  private subscription: Subscription = new Subscription();

  constructor(
    private dataService: FilmService,
  ) {
  }

  public ngOnInit(): void {
    this.initFilmsList();
    this.initGenresList();
  }

  public get getFilmsList(): Observable<FilmListInterface[]> {
    return this.dataService.getFilmList;
  }

  public get getGenresList(): Observable<GenresListInterface[]> {
    return this.dataService.getGenresList;
  }

  public setFavoriteFilm(film: FilmListInterface): void {
    this.dataService.setFavoriteFilm(film);
  }

  public loadMoreFilms(): void {
    this.dataService.getMoreFilms();
  }

  public identify(index, item): number {
    return item.id;
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private initFilmsList(): void {
    const filmsSubscription = this.dataService.initFilmList()
      .subscribe();

    this.subscription.add(filmsSubscription);
  }

  private initGenresList(): void {
    const genresSubscription = this.dataService.initGenresList()
      .subscribe();

    this.subscription.add(genresSubscription);
  }

}
