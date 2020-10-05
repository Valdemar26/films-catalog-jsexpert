import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';

import { FilmInterface } from '../film-catalog/interfaces/film.interface';
import { DataService } from './data.service';


@Injectable({
  providedIn: 'root'
})
export class SearchService {

  public searchFilm$: Subject<FilmInterface[]> = new Subject();
  private existFilms = this.dataService.getFilmList;

  constructor(private dataService: DataService) { }

  public searchFilms(event): any {
    // this.searchFilm$.
  }

}
