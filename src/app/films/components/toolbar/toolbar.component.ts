import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { fromEvent, Observable, of, Subscription } from 'rxjs';

import { FilmInterface } from '../../../film-catalog/interfaces/film.interface';
import { DataService } from '../../../services/data.service';
import { SearchService } from '../../../services/search.service';

import { debounceTime, distinctUntilChanged, map, skipWhile, switchMap, tap } from 'rxjs/operators';


@Component({
  selector: 'exp-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  @ViewChild('searchRef') searchRef: ElementRef;

  public filmsList: FilmInterface[];
  public sortingMethod: number;
  public favoriteFilmsCounter = 0;



  constructor(
    public dataService: DataService,
    private searchService: SearchService
  ) { }

  ngOnInit(): void {
    this.checkFavoriteFilms();
    this.getCountOfFavoriteFilms();

    this.dataService.getFilmList.subscribe((films) => this.filmsList = films);
  }

  private checkFavoriteFilms(): Subscription {
    return this.dataService.getFavoriteFilm().subscribe( (count) => {
      return this.favoriteFilmsCounter = count;
    });
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

  getFilteredFilms(currentInputValue): Observable<any> {
    return of(this.filmsList).pipe(
      map((arrOfFilms: FilmInterface[]) => {
        console.log('arrOfFilms: ', arrOfFilms);
        return arrOfFilms.filter((item) => item.title.includes(currentInputValue));
      })
    );
  }

  public getCountOfFavoriteFilms(): any {
    return this.dataService.getCountFavoriteFilm().subscribe((data) => {
      this.favoriteFilmsCounter = data;
      console.log(this.favoriteFilmsCounter);
    });
  }



}
