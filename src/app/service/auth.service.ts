import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: Observable<any>; // firebase.User

  constructor(private firebaseAuth: AngularFireAuth) {
    this.user = firebaseAuth.authState;
  }

  public signup(email: string, password: string): any {
    this.firebaseAuth
      .createUserWithEmailAndPassword(email, password)
      .then(value => {
        console.log('Success!', value);
      })
      .catch(err => {
        console.log('Something went wrong:', err.message);
      });
  }

  public login(email: string, password: string): any {
    this.firebaseAuth
      .signInWithEmailAndPassword(email, password)
      .then(value => {
        console.log('Nice, it worked!');
      })
      .catch(err => {
        console.log('Something went wrong:', err.message);
      });
  }

  public logout(): any {
    this.firebaseAuth.signOut();
  }
}
