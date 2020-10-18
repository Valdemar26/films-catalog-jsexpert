import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { fromEvent, Observable, of, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, skipWhile, switchMap, tap } from 'rxjs/operators';

import { FilmInterface } from '../../interfaces/film.interface';
import { FilmService } from '../../services/film.service';


@Component({
  selector: 'exp-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  @ViewChild('searchRef') searchRef: ElementRef;

  public filmsList: FilmInterface[];
  public sortingMethod: number;
  public favoriteFilmsCounter: number;

  constructor(
    public dataService: FilmService
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
    return this.dataService.sortFilmByTitle(value);
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

    // this.dataService.updateFilmList(value);
  }

  private getFilteredFilms(currentInputValue): Observable<any> {
    return of(this.filmsList).pipe(
      map((arrOfFilms: FilmInterface[]) => {
        console.log('arrOfFilms: ', arrOfFilms);
        return arrOfFilms.filter((item) => item.title.includes(currentInputValue));
      })
    );
  }

  public getCountOfFavoriteFilms(): any {
    return this.dataService.getCountFavoriteFilm().subscribe((data) => {
      console.log('data: ', data);
      this.favoriteFilmsCounter = data;
    });
  }

  private getFilmList(): void {
    this.dataService.getFilmList.subscribe((films) => this.filmsList = films);
  }

}
