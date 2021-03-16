import {
  ChangeDetectorRef,
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

import { Subject, Subscription } from 'rxjs';
import { delay, tap } from 'rxjs/operators';

import { FilmService } from '../../../../services/film.service';
import { FilmDetailService } from '../../../../services/film-detail.service';


import { ModalComponent } from '../../../../../shared/components/modal/modal.component';
import { FilmListInterface } from '../../../../interfaces/film-list.interface';
import { LoaderService } from '../../../../../shared/services/loader.service';
import { FilmReviewInterface } from '../../../../interfaces/film-review.interface';
import { NotificationsService } from '../../../../../shared/components/toast/notification/notifications.service';
import { ModalTypeEnum } from '../../../../../shared/components/toast/enum/notification-type.enum';
import { NotificationInterface } from '../../../../../shared/components/toast/interfaces/notification.interface';
import { TranslateService } from '@ngx-translate/core';
import {ActorListInterface} from '../../../../../actors/interfaces/actor-list.interface';


@Component({
  selector: 'exp-film-detail',
  templateUrl: './film-detail.component.html',
  styleUrls: ['./film-detail.component.scss']
})
export class FilmDetailComponent implements OnInit, OnDestroy {

  @ViewChild('modalContainer', { read: ViewContainerRef }) container;
  @ViewChild('notificationContainer', { read: ViewContainerRef }) notification;
  @ViewChild('foreverModalContainer', { read: ViewContainerRef }) foreverModalContainer;
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
    private loaderService: LoaderService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private sanitizer: DomSanitizer,
    private resolver: ComponentFactoryResolver,
    private notificationService: NotificationsService,
    private translationService: TranslateService,
    private cdr: ChangeDetectorRef
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
          this.adultFilm = film.adult;  // TODO check if film is 'adult' - create notification service and close-modal
          this.checkAdultFilm();
        }
    });

    this.subscription.add(filmSubscription);
  }

  private checkAdultFilm(): void {
    if (this.adultFilm) {
      console.log('adultFilm: ', this.adultFilm);
      this.showAdultModal();
    }
  }

  private showDeleteForeverModal(id): void {
    let modalTitle, modalText;

    this.translationService.get('Hide film').subscribe((data) => modalTitle = data);
    this.translationService.get('Hide text').subscribe((data) => modalText = data);


    const config: NotificationInterface = {
      title: modalTitle,
      text: modalText,
      modalType: ModalTypeEnum.Error,
      icon: {
        src: './../../../../../assets/images/warning.svg',
        alt: 'warning-icon'
      },
      confirm$: new Subject<true>()
    };

    this.notificationService.showModal(this.foreverModalContainer, config, id);

    config.confirm$.subscribe(() => console.log('CONFIRM'));
  }



  private showAdultModal(): void {
    console.log('showAdultModal');

    const config: NotificationInterface = {
      title: 'Вам виповнилось 18 років?',
      text: 'Даний фільм може містити сцени, не призначені для перегляду особами, молодше за 18 років',
      modalType: ModalTypeEnum.Error,
      icon: {
        src: './../../../../../assets/images/warning.svg',
        alt: 'warning-icon'
      },
      confirm$: new Subject<true>()
    };


    this.notificationService.showModal(this.foreverModalContainer, config);
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

  public openFilm(film: FilmListInterface): void {
    this.router.navigate(['/films/' + film.id]);
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  public openActor(id: number): void {
    this.router.navigate(['/actors/' + id]);
  }

  public closeForever(id: number): void {
    this.showDeleteForeverModal(id);
  }
}
