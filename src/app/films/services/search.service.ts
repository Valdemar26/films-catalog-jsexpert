import { Injectable } from '@angular/core';

import { FilmService } from './film.service';


@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private dataService: FilmService) { }

  public searchFilms(event): any {
    console.log(event);
  }

}
