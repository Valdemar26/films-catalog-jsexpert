import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

import { Observable } from 'rxjs';

import { NotificationsService } from '../shared/components/toast/notification/notifications.service';
import {NotificationTypeEnum} from "../shared/components/toast/enum/notification-type.enum";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: Observable<any>; // firebase.User

  config = {
    title: 'Some Title',
    text: 'Some text',
    notificationType: NotificationTypeEnum.Error,
    icon: {
      src: 'https://cdn4.iconfinder.com/data/icons/rounded-white-basic-ui/139/Warning01-RoundedWhite-512.png',
      alt: 'error-icon'
    }
  };

  constructor(
    private firebaseAuth: AngularFireAuth,
    private notificationService: NotificationsService
  ) {
    this.user = firebaseAuth.authState;
  }

  public signup(email: string, password: string, toastContainer?): any {
    this.firebaseAuth
      .createUserWithEmailAndPassword(email, password)
      .then(value => {
        console.log('Success!', value);
      })
      .catch(err => {
        console.log('Something went wrong:', err.message);
      });
  }

  public login(email: string, password: string, toastContainer?): any {
    this.firebaseAuth
      .signInWithEmailAndPassword(email, password)
      .then(value => {
        console.log('Nice, it worked!');

        if (toastContainer) {
          const config = {
            title: 'Login Message',
            text: 'You are successfully login!',
            notificationType: NotificationTypeEnum.Success,
            icon: {
              src: './assets/images/ok.svg',
              alt: 'success-icon'
            }
          };

          this.notificationService.showToast(toastContainer, config);
        }

      })
      .catch(err => {
        console.log('Something went wrong:', err.message);

        if (toastContainer) {

          const config = {
            title: 'Error on Login',
            text: err.message,
            notificationType: NotificationTypeEnum.Error,
            icon: {
              src: 'https://cdn4.iconfinder.com/data/icons/rounded-white-basic-ui/139/Warning01-RoundedWhite-512.png',
              alt: 'error-icon'
            }
          };

          this.notificationService.showToast(toastContainer, config);
        }
      });
  }

  public logout(): any {
    this.firebaseAuth.signOut();
  }
}
