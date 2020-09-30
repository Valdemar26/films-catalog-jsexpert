import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';

import { MainComponent } from './main/main.component';
import { FilmsListComponent } from './films-list/films-list.component';
import { FooterComponent } from './footer/footer.component';
import { DetailsComponent } from './details/details.component';
import { FilmItemComponent } from './films-list/film-item/film-item.component';
import {MatSelectModule} from '@angular/material/select';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';

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
    MatIconModule
  ],
  exports: [
    FooterComponent
  ],
  declarations: [
    MainComponent,
    FilmsListComponent,
    DetailsComponent,
    FooterComponent,
    FilmItemComponent
  ]
})
export class FilmCatalogModule { }
