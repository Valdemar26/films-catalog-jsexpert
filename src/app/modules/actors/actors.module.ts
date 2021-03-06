import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActorsListComponent } from './components/actors-list/actors-list.component';
import { ActorItemComponent } from './components/actors-list/actor-item/actor-item.component';
import { ActorDetailComponent } from './components/actors-list/actor-item/actor-detail/actor-detail.component';
import { ActorsRoutingModule } from './actors-routing.module';


@NgModule({
  declarations: [
    ActorsListComponent,
    ActorItemComponent,
    ActorDetailComponent
  ],
  imports: [
    CommonModule,
    ActorsRoutingModule
  ]
})
export class ActorsModule { }
