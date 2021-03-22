import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { ActorResolver } from './resolvers/actor.resolver';
import { ActorsListComponent } from './components/actors-list/actors-list.component';
import { ActorDetailComponent } from './components/actors-list/actor-item/actor-detail/actor-detail.component';

const routes: Routes = [
  {
    path: '',
    component: ActorsListComponent,
    resolve: { data: ActorResolver }
  },
  {
    path: ':id',
    component: ActorDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ActorsRoutingModule {
}
