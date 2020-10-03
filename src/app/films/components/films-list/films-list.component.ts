import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';

import { FilmInterface } from '../../../film-catalog/interfaces/film.interface';
import { DataService } from '../../../services/data.service';


@Component({
  selector: 'exp-films-list',
  templateUrl: './films-list.component.html',
  styleUrls: ['./films-list.component.scss']
})
export class FilmsListComponent implements OnInit, OnDestroy {

  public filmsList: FilmInterface[];
  public sortingMethod: number;
  public favoriteFilmsCounter = 0;
  private subscription: Subscription = new Subscription();


  constructor(
    private dataService: DataService
  ) {
  }

  public ngOnInit(): void {
    this.initFilmsList();
  }

  public transform(value): FilmInterface[] {
    const direction = !!parseInt(value, 10) ? -1 : 1;
    return this.filmsList.sort((a: FilmInterface, b: FilmInterface) => direction * (a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1));
  }

  private initFilmsList(): void {
    // this.filmsList = this.filmsService.initFilms();
    const filmsSubscription = this.dataService.getFilmList()
      .subscribe( (films: any) => {
        this.filmsList = films.results;
        console.log('filmsList: ', this.filmsList);
      });

    this.subscription.add(filmsSubscription);
  }

  public setFavorite(count: boolean): void {
    count ? this.favoriteFilmsCounter++ : this.favoriteFilmsCounter--;
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
