import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { fromEvent, Observable, of, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, skipWhile, switchMap, tap } from 'rxjs/operators';


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
  public favoriteFilmsCounter: number;

  constructor(
    public filmService: FilmService
  ) { }

  ngOnInit(): void {
    // this.checkFavoriteFilms();
    this.getCountOfFavoriteFilms();
    this.getFilmList();

    if (localStorage.getItem('favoriteFilms') && localStorage.getItem('favoriteFilms').length) {
      this.favoriteFilmsCounter = JSON.parse(localStorage.getItem('favoriteFilms')).length;
    }

  }

  public transform(value): Subscription {
    return this.filmService.sortFilmByTitle(value);
  }

  public searchFilmByTitle(): void {

    const value = fromEvent(this.searchRef.nativeElement, 'keyup').pipe(
      skipWhile((data) => !data),
      map((e: any) => {
        console.log('e: ', e);
        return e.target.value;
      }),
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((currentInputValue) => {
        return this.getFilteredFilms(currentInputValue);
      }),
      tap((res) => console.log('res: ', res))
    );

    value.subscribe((data) => console.log('DATA: ', data));

    // this.filmService.updateFilmList(value);
  }

  private getFilteredFilms(currentInputValue): Observable<any> {
    return of(this.filmsList).pipe(
      map((arrOfFilms: FilmListInterface[]) => {
        console.log('arrOfFilms: ', arrOfFilms);
        const filmResult = arrOfFilms.filter((item: FilmListInterface) => {
          return item.original_title.includes(currentInputValue);
        });
        this.filmService.updateFilmListAfterSearch(filmResult);
        return filmResult;
      })
    );
  }

  public getCountOfFavoriteFilms(): any {
    return this.filmService.getCountFavoriteFilm().subscribe((data) => {
      console.log('data: ', data);
      this.favoriteFilmsCounter = data;
    });
  }

  private getFilmList(): void {
    this.filmService.getFilmList.subscribe((films) => this.filmsList = films);
  }

}
