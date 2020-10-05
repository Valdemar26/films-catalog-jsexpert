import { Component, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';

import { FilmInterface } from '../../../film-catalog/interfaces/film.interface';
import { DataService } from '../../../services/data.service';
import {SearchService} from '../../../services/search.service';


@Component({
  selector: 'exp-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

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
  }

  private checkFavoriteFilms(): Subscription {
    return this.dataService.getFavoriteFilm().subscribe( (count) => {
      console.log('count: ', count);
      return this.favoriteFilmsCounter = count;
    });
  }

  public transform(value): Subscription {
    return this.dataService.sortFilmByTitle(value);
  }

  public searchFilmByTitle(event: Event): void {
    console.log(event);
    if (event && (event.target as HTMLInputElement).value) {
      this.searchService.searchFilms(event);
    }
  }

  public getCountOfFavoriteFilms(): any {
    return this.dataService.getCountFavoriteFilm().subscribe((data) => {
      this.favoriteFilmsCounter = data;
      console.log(this.favoriteFilmsCounter);
    });
  }



}
