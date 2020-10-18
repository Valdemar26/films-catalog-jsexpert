import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { LoaderComponent } from './components/loader/loader.component';
import { RatingComponent } from './components/rating/rating.component';
import { ModalComponent } from './components/modal/modal.component';
import { SafeUrlPipe } from './pipe/safe-url.pipe';


@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    LoaderComponent,
    RatingComponent,
    ModalComponent,
    SafeUrlPipe
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    RouterModule
  ],
  exports: [
    FooterComponent,
    HeaderComponent,
    LoaderComponent,
    RatingComponent,
    ModalComponent
  ],
  entryComponents: [ModalComponent]
})
export class SharedModule { }
