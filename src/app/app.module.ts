import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FilmCatalogModule } from './film-catalog/film-catalog.module';
import { SharedModule } from './shared/shared.module';
import { FilmsModule } from './films/films.module';
import { ActorsModule } from './actors/actors.module';

import { FilmsInterceptor } from './interceptor/films.interceptor';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FilmCatalogModule,
    SharedModule,
    FilmsModule,
    ActorsModule,
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: FilmsInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

