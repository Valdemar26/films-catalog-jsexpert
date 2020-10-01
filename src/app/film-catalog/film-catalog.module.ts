import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { MatIconModule} from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatGridListModule } from '@angular/material/grid-list';

import { SharedModule } from '../shared/shared.module';

import { MainComponent } from './main/main.component';
import { FilmsListComponent } from './films-list/films-list.component';
import { DetailsComponent } from './details/details.component';
import { FilmItemComponent } from './films-list/film-item/film-item.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatGridListModule,
    MatTabsModule,
    MatSelectModule,
    MatToolbarModule,
    MatIconModule,
    SharedModule
  ],
  declarations: [
    MainComponent,
    FilmsListComponent,
    DetailsComponent,
    FilmItemComponent
  ]
})
export class FilmCatalogModule { }
