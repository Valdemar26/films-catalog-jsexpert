import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { FilmsModule } from './films/films.module';
import { ActorsModule } from './actors/actors.module';

import { FilmsInterceptor } from './interceptor/films.interceptor';
import { WelcomeModule } from './welcome/welcome.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    WelcomeModule,
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

