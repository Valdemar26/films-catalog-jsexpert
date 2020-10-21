import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { fromEvent, Observable, of, Subscription } from 'rxjs';
import {debounceTime, distinctUntilChanged, finalize, map, skipWhile, switchMap, tap} from 'rxjs/operators';

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

  public searchForm: FormGroup;
  public isLoading: boolean;
  public filteredFilms: FilmListInterface[] = [];

  constructor(
    public filmService: FilmService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.getFilmList();

    this.initSearchForm();
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
      distinctUntilChanged(),
      switchMap((currentInputValue) => {
        return this.getFilteredFilms(currentInputValue);
      }),
      tap((res) => console.log('res: ', res))
    );

    value.subscribe((data) => console.log('DATA: ', data));
  }

  private getFilteredFilms(currentInputValue): Observable<any> {
    return of(this.filmsList).pipe(
      map((arrOfFilms: FilmListInterface[]) => {
        const filmResult = arrOfFilms.filter((item: FilmListInterface) => {
          return item.original_title.toLowerCase().includes(currentInputValue.toLowerCase());
        });
        this.filmService.updateFilmListAfterSearch(filmResult);
        return filmResult;
      })
    );
  }

  public get getFavoriteFilmsCount(): Observable<number> {
    return this.filmService.getCountFavoriteFilm();
  }

  public displayFn(user: any): void {
    if (user) {
      return user.name;
    }
  }

  private getFilmList(): void {
    this.filmService.getFilmList.subscribe((films) => this.filmsList = films);
  }

  private initSearchForm(): void {
    this.searchForm = this.fb.group({
      searchInput: ['']
    });

    this.searchForm.get('searchInput').valueChanges.pipe(
      debounceTime(300),
      tap(() => this.isLoading = true),
      switchMap((currentInputValue) => this.getFilteredFilms(currentInputValue)),
      tap(() => this.isLoading = false)
    ).subscribe((films: FilmListInterface[]) => this.filteredFilms = films);
  }

}
