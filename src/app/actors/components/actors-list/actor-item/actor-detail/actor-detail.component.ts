import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Subscription } from 'rxjs';
import { delay, tap } from 'rxjs/operators';

import { ActorService } from '../../../../services/actor.service';
import { LoaderService } from '../../../../../shared/services/loader.service';
import { ActorListInterface } from '../../../../interfaces/actor-list.interface';


@Component({
  selector: 'exp-actor-detail',
  templateUrl: './actor-detail.component.html',
  styleUrls: ['./actor-detail.component.scss']
})
export class ActorDetailComponent implements OnInit, OnDestroy {

  public actorDetail: ActorListInterface;
  public actorId: number;
  public imagePath = 'https://image.tmdb.org/t/p/w300_and_h450_bestv2';


  private subscription: Subscription = new Subscription();

  constructor(
    private actorService: ActorService,
    private loaderService: LoaderService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  public ngOnInit(): void {
    window.scroll(0, 0);

    this.initActorSubscription();

    this.getActorIdFromUrl();

    this.initActorDetail();


  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private initActorDetail(): void {
    this.actorService.getActorById(this.actorId).subscribe();
  }

  private initActorSubscription(): void {

    const actorSubscription = this.actorService.getActorObservable().pipe(
      tap(() => this.loaderService.show()),
      delay(800)
    ).subscribe((actor: ActorListInterface) => {

      if (actor) {
        this.actorDetail = actor;
        this.loaderService.hide();
      }
    });

    this.subscription.add(actorSubscription);
  }

  private getActorIdFromUrl(): number {
    return this.actorId = this.route.snapshot.params['id'];
  }

}
