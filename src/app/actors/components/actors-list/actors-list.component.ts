import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { ActorService } from '../../services/actor.service';
import { ActorListInterface } from '../../interfaces/actor-list.interface';

@Component({
  selector: 'exp-actors-list',
  templateUrl: './actors-list.component.html',
  styleUrls: ['./actors-list.component.scss']
})
export class ActorsListComponent implements OnInit {

  constructor(private actorService: ActorService) { }

  public ngOnInit(): void {
  }

  public get getActorList(): Observable<ActorListInterface[]> {
    return this.actorService.getActorList;
  }

  public identify(index, item): number {
    return item.id;
  }

}
