import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import {Observable, Subscription} from 'rxjs';

import { FilmInterface } from '../../../../interfaces/film.interface';
import { DataService } from '../../../../services/data.service';


@Component({
  selector: 'exp-film-detail',
  templateUrl: './film-detail.component.html',
  styleUrls: ['./film-detail.component.scss']
})
export class FilmDetailComponent implements OnInit, OnDestroy {

  public filmDetail: FilmInterface;

  private filmId: number;
  private subscription: Subscription = new Subscription();


  constructor(
    private dataService: DataService,
    private route: ActivatedRoute
    ) { }

  public ngOnInit(): void {
    this.initFilmSubscription();
    this.getFilmIdFromUrl();
    this.initFilmDetail();
  }

  private getFilmIdFromUrl(): number {
    return this.filmId = this.route.snapshot.params['id'];
  }

  public initFilmDetail(): void {
    this.dataService.getFilmById(this.filmId);
  }

  private initFilmSubscription(): void {
    const filmSubscription = this.dataService.getFilmObservable().subscribe((film: FilmInterface) => {
      if (film) {
        this.filmDetail = film;
      }
      console.log('filmDetail: ', this.filmDetail);
    });

    this.subscription.add(filmSubscription);
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
