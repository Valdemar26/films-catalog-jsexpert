import {
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';

import { Subscription} from 'rxjs';
import { delay, tap } from 'rxjs/operators';

import { FilmService } from '../../../../services/film.service';
import { FilmDetailService } from '../../../../services/film-detail.service';


import { ModalComponent } from '../../../../../shared/components/modal/modal.component';
import { FilmListInterface } from '../../../../interfaces/film-list.interface';
import { NotificationService } from '../../../../../shared/services/notification.service';
import { NotificationModalComponent } from '../../../../../shared/components/notification-modal/notification-modal.component';
import { LoaderService } from '../../../../../shared/services/loader.service';
import { FilmReviewInterface } from '../../../../interfaces/film-review.interface';


@Component({
  selector: 'exp-film-detail',
  templateUrl: './film-detail.component.html',
  styleUrls: ['./film-detail.component.scss']
})
export class FilmDetailComponent implements OnInit, OnDestroy {

  @ViewChild('modalContainer', { read: ViewContainerRef }) container;
  @ViewChild('notificationContainer', { read: ViewContainerRef }) notification;
  componentRef: ComponentRef<any>;

  public filmDetail: FilmListInterface;
  public adultFilm: boolean;

  public imagePath = 'https://image.tmdb.org/t/p/w500';
  public backdropPath = 'https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/';

  public trailerPath: string;
  public movieReview: FilmReviewInterface[];

  public filmId: number;
  private subscription: Subscription = new Subscription();

  public heroesList;
  public similarList;


  constructor(
    private filmService: FilmService,
    private filmDetailService: FilmDetailService,
    private notificationService: NotificationService,
    private loaderService: LoaderService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private sanitizer: DomSanitizer,
    private resolver: ComponentFactoryResolver,
    ) { }

  public ngOnInit(): void {
    window.scroll(0, 0);

    // TODO combine it to mergeMap  initFilmHeroes + getFilmTrailer + getSimilarFilms + getFilmReviews
    this.initFilmSubscription();
    this.getFilmIdFromUrl();
    this.initFilmDetail();
    this.initFilmHeroes();
    this.getFilmTrailer();
    this.getSimilarFilms();
    this.getFilmReviews();
  }

  private initFilmDetail(): void {
    this.filmService.getFilmById(this.filmId).subscribe();
  }

  public back(): void {
    this.router.navigate(['/films']);
  }

  public openTrailerModal(): void {
    this.container.clear();
    const factory = this.resolver.resolveComponentFactory(ModalComponent);
    this.componentRef = this.container.createComponent(factory);

    this.componentRef.instance.parentRef = this.componentRef;

    this.componentRef.instance.trailerPath = this.trailerPath;
    this.componentRef.instance.filmTitle = this.filmDetail.original_title;
  }

  public modalClosed(isClosed): void {
    console.log(isClosed);
    this.container.clear();
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();

    if (this.componentRef) {
      this.componentRef.destroy();
    }
  }

  private initFilmSubscription(): void {
    const filmSubscription = this.filmService.getFilmObservable().pipe(
      tap(() => this.loaderService.show()),
      delay(800),
    )
      .subscribe((film: FilmListInterface) => {

        if (film) {
          this.filmDetail = film;
          this.loaderService.hide();
          this.adultFilm = film.adult;  // TODO check if film is 'adult' - create notification service and modal
          this.checkAdultFilm();
        }
    });

    this.subscription.add(filmSubscription);
  }

  private checkAdultFilm(): void {
    if (this.adultFilm) {
      console.log('adultFilm: ', this.adultFilm);
      this.createNotification();
    }
  }

  private createNotification(): void {
    this.notification.clear();
    const factory = this.resolver.resolveComponentFactory(NotificationModalComponent);
    this.componentRef = this.notification.createComponent(factory);

    this.componentRef.instance.modalNotification = this.notificationService.modalNotification;
  }

  private initFilmHeroes(): void {
    const heroesSubscription = this.filmDetailService.getFilmHeroes(this.filmId)
      .subscribe((heroes) => this.heroesList = heroes.cast);

    this.subscription.add(heroesSubscription);
  }

  private getFilmTrailer(): void {

    const trailerSubscription = this.filmDetailService.getTrailerByFilmId(this.filmId)
      .subscribe((trailer) => {
        if (trailer.results && trailer.results.length) {
          const youtubeId = trailer.results[0].key;
          const youtubePath = 'https://www.youtube.com/embed/';
          this.trailerPath = `${youtubePath}${youtubeId}`;
        }
      });

    this.subscription.add(trailerSubscription);
  }

  private getFilmIdFromUrl(): number {
    return this.filmId = this.route.snapshot.params['id'];
  }

  private getSimilarFilms(): any {

    const similarFilmsSubscription = this.filmDetailService.getSimilarFilmsById(this.filmId)
      .subscribe((similar) => {
        this.similarList = similar.results;
      });

    this.subscription.add(similarFilmsSubscription);
  }

  private getFilmReviews(): any {
    const filmReviewsSubscription = this.filmDetailService.getFilmReviews(this.filmId)
      .subscribe((review) => {
        this.movieReview = review.results;
      });

    this.subscription.add(filmReviewsSubscription);
  }

  public openFilm(film: FilmListInterface): any {
    console.log(film.id);
    // this.router.navigate(['/films/' + film.id]);  // TODO check why this doesn't work!
  }
}
