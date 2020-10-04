import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

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
    return this.filmsList.sort((a: FilmInterface, b: FilmInterface) => {
      return direction * (a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1);
    });
  }

  private initFilmsList(): void {
    const filmsSubscription = this.dataService.initFilmList().pipe(
      map(({results}) => {
        console.log(results);
        return results;
      })
    )
      .subscribe((films: FilmInterface[]) => this.dataService.updateFilmList(films));

    this.subscription.add(filmsSubscription);
  }

  public get getFilmsList(): any {
    return this.dataService.getFilmList;
  }

  public setFavoriteFilm(film: FilmInterface): void {
    this.dataService.setFavoriteFilm(film);
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
