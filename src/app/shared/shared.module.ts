import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { TranslateModule } from '@ngx-translate/core';

import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { LoaderComponent } from './components/loader/loader.component';
import { RatingComponent } from './components/rating/rating.component';
import { ModalComponent } from './components/modal/modal.component';
import { SafeUrlPipe } from './pipe/safe-url.pipe';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { CommentsComponent } from './components/comments/comments.component';
import { CommentsPipe } from './pipe/comments.pipe';
import { ReplyComponent } from './components/reply/reply.component';
import { ToastComponent } from './components/toast/toast.component';
import { CloseModalComponent } from './components/toast/close-modal/close-modal.component';
import { ReversePipe } from './pipe/reverse.pipe';


@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    LoaderComponent,
    RatingComponent,
    ModalComponent,
    SafeUrlPipe,
    LoginComponent,
    RegistrationComponent,
    CommentsComponent,
    CommentsPipe,
    ReplyComponent,
    ToastComponent,
    CloseModalComponent,
    ReversePipe
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSlideToggleModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule
  ],
  exports: [
    FooterComponent,
    HeaderComponent,
    LoaderComponent,
    RatingComponent,
    ModalComponent,
    CommentsComponent,
    ReplyComponent,
    CommentsPipe,
    ToastComponent,
    CloseModalComponent,
    TranslateModule,
    ReversePipe
  ],
  entryComponents: [ModalComponent, CloseModalComponent]
})
export class SharedModule { }
