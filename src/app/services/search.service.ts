import { Injectable } from '@angular/core';

import { DataService } from './data.service';


@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private dataService: DataService) { }

  public searchFilms(event): any {
    console.log(event);
  }

}
