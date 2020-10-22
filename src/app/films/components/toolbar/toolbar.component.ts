import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { fromEvent, Observable, Subscription } from 'rxjs';
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
    public filmService: FilmService
  ) { }

  ngOnInit(): void {
    this.getFilmList();
  }

  public transform(value): Subscription {
    return this.filmService.sortFilmByTitle(value);
  }

  public searchFilmByTitle(): void {

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

    const result = this.filmsList.filter((item: FilmListInterface) => {
      return item.original_title.toLowerCase().includes(inputValue.toLowerCase());
    });
    console.log(result);

    this.filmService.updateFilmListAfterSearch(result);
  }

  public get getFavoriteFilmsCount(): Observable<number> {
    return this.filmService.getCountFavoriteFilm();
  }

  private getFilmList(): void { // todo .subscribe to another stream
    this.filmService.getFilmList.subscribe((films) => this.filmsList = films);
    // this.filmService.foundedSearchFilm.subscribe((films) => this.filmsList = films);
  }

}
