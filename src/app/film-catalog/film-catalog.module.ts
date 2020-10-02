import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';

import { SharedModule } from '../shared/shared.module';

import { MainComponent } from './main/main.component';
import { FilmsListComponent } from '../films/components/films-list/films-list.component';
import { DetailsComponent } from './details/details.component';
import { FilmItemComponent } from '../films/components/films-list/film-item/film-item.component';
import { FilmsModule } from '../films/films.module';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatSelectModule} from "@angular/material/select";
import {MatIconModule} from "@angular/material/icon";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatGridListModule,
    MatTabsModule,
    SharedModule,
    FilmsModule,
    MatToolbarModule,
    MatSelectModule,
    MatIconModule
  ],
  declarations: [
    MainComponent,
    FilmsListComponent,
    DetailsComponent,
    FilmItemComponent
  ]
})
export class FilmCatalogModule { }
