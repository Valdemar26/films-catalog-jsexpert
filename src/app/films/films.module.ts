import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { FilmsListComponent } from './components/films-list/films-list.component';
import { FilmItemComponent } from './components/films-list/film-item/film-item.component';
import { DetailsComponent } from './components/details/details.component';
import { FilmDetailComponent } from './components/films-list/film-item/film-detail/film-detail.component';
import { FavoriteFilmsComponent } from './components/favorite-films/favorite-films.component';
import { FavoriteFilmsPipe } from './pipes/favorite-films.pipe';
import { HideFilmPipe } from './pipes/hide-film.pipe';
import { CurrencyPipe } from './pipes/currency.pipe';


@NgModule({
  declarations: [
    ToolbarComponent,
    FilmsListComponent,
    FilmItemComponent,
    DetailsComponent,
    FilmDetailComponent,
    FavoriteFilmsComponent,
    FavoriteFilmsPipe,
    HideFilmPipe,
    CurrencyPipe
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatIconModule,
    MatSelectModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatGridListModule,
    MatAutocompleteModule,
    MatProgressSpinnerModule
  ],
  exports: [
    ToolbarComponent
  ]
})
export class FilmsModule { }
