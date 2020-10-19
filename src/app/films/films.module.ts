import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';

import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { FilmsListComponent } from './components/films-list/films-list.component';
import { FilmItemComponent } from './components/films-list/film-item/film-item.component';
import { DetailsComponent } from './components/details/details.component';
import { FilmDetailComponent } from './components/films-list/film-item/film-detail/film-detail.component';
import { FavoriteFilmsComponent } from './components/favorite-films/favorite-films.component';


@NgModule({
  declarations: [
    ToolbarComponent,
    FilmsListComponent,
    FilmItemComponent,
    DetailsComponent,
    FilmDetailComponent,
    FavoriteFilmsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatToolbarModule,
    MatIconModule,
    MatSelectModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatGridListModule
  ],
  exports: [
    ToolbarComponent
  ]
})
export class FilmsModule { }
