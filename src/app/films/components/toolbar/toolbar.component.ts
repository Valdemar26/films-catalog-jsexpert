import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { fromEvent, Observable, of, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, skipWhile } from 'rxjs/operators';

import { FilmService } from '../../services/film.service';
import { FilmListInterface } from '../../interfaces/film-list.interface';


@Component({
  selector: 'exp-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  @ViewChild('searchRef') searchRef: ElementRef;

  public filmsList: FilmListInterface[];
  public sortingMethod: number;

  constructor(
    private filmService: FilmService
  ) { }

  ngOnInit(): void {
    this.getFilmList();
  }

  public transform(value): Subscription {
    return this.filmService.sortFilmByTitle(value);
  }

  public searchFilmByTitle(): void { // TODO make search from real API

    const value = fromEvent(this.searchRef.nativeElement, 'keyup').pipe(
      skipWhile((data) => !data),
      map((e: any) => {
        return e.target.value;
      }),
      debounceTime(500),
      distinctUntilChanged()
    );

    value.subscribe((currentInputValue) => this.getFilteredFilms(currentInputValue));
  }

  private getFilteredFilms(inputValue): void {
    this.filmsList = JSON.parse(localStorage.getItem('filmListArray'));

    const result = this.filmsList.filter((item: FilmListInterface) => {
      return item.original_title.toLowerCase().includes(inputValue.toLowerCase());
    });

    this.filmService.updateFilmListAfterSearch(result);
  }

  public get getFavoriteFilmsCount(): Observable<number> {
    let allFilms = [];
    const favoriteFilmsArray = [];

    this.filmService.getFilmList.subscribe((films: FilmListInterface[]) => allFilms = films);
    allFilms.forEach((film: FilmListInterface) => {
      if (film.isFavorite) {
        favoriteFilmsArray.push(film);
      }
    });

    return of(favoriteFilmsArray.length);
  }

  private getFilmList(): void {
    this.filmService.getFilmList.subscribe((films: FilmListInterface[]) => this.filmsList = films);
  }

}
