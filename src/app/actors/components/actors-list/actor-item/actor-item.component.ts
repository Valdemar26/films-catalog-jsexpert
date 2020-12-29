import { Component, Input, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit(): void {
    console.log(this.actor);
    this.fetchPosterPath();
  }

  private fetchPosterPath(): string {
    return this.actorImagePath = 'https://image.tmdb.org/t/p/w235_and_h235_face' + this.actor.profile_path;
  }

}
