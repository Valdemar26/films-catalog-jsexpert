import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

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

  public imagePath = 'https://image.tmdb.org/t/p/w500';
  public backdropPath = 'https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/';

  private filmId: number;
  private subscription: Subscription = new Subscription();


  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private router: Router
    ) { }

  public ngOnInit(): void {
    this.initFilmSubscription();
    this.getFilmIdFromUrl();
    this.initFilmDetail();

    // this.getFullFilmInfoById();
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
        // this.filmDetail.poster_path = 'https://image.tmdb.org/t/p/w500' + film.poster_path;
      }
      console.log('filmDetail: ', this.filmDetail);
    });

    this.subscription.add(filmSubscription);
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  // private getFullFilmInfoById(): void {
  //   this.dataService.getFullFilmInfo().subscribe((data) => console.log('HARDCODED: ', data));
  // }

  public back(): void {
    this.router.navigate(['/films']);
  }
}
