import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ActorListInterface } from '../../../interfaces/actor-list.interface';

@Component({
  selector: 'exp-actor-item',
  templateUrl: './actor-item.component.html',
  styleUrls: ['./actor-item.component.scss']
})
export class ActorItemComponent implements OnInit {

  @Input() set actorList(value: ActorListInterface) {
    this.actor = value;
  }

  public actor: ActorListInterface;
  public actorImagePath: string;

  constructor(private router: Router) { }

  public ngOnInit(): void {
    this.fetchPosterPath();
  }

  public openActor(actor: ActorListInterface): void {
    this.router.navigate(['/actors/' + actor.id]);
  }

  private fetchPosterPath(): string {
    return this.actorImagePath = 'https://image.tmdb.org/t/p/w235_and_h235_face' + this.actor.profile_path;
  }

}
