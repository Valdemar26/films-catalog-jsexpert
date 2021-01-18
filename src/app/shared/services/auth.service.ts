// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
//
// import { Observable, of } from 'rxjs';
// import { retry, tap } from 'rxjs/operators';
//
// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {
//
//   private authUrl = 'https://reqres.in/api';
//   private loggedIn = false;
//
//   constructor(private http: HttpClient) {
//     this.loggedIn = !!localStorage.getItem('auth_token');  // when refresh page -> check token
//   }
//
//   public isLoggedIn(): boolean {
//     return this.loggedIn;
//   }
//
//   public login(username: string, password: string): Observable<any> {
//
//     console.log(username, password);
//
//     return this.http.post(`${this.authUrl}/login`, {username, password})
//       .pipe(
//         retry(2),
//         tap(res => {
//           console.log('res: ', res);
//           if (res.token) {
//             localStorage.setItem('auth_token', res.token);
//             this.loggedIn = true;
//           }
//         }),
//       );
//   }
//
//   public register(username: string, password: string): Observable<any> {
//     console.log(username, password);
//
//     return this.http.post(`${this.authUrl}/register`, {username, password})
//       .pipe(
//         tap(res => {
//           console.log('res: ', res);
//           if (res.token) {
//             localStorage.setItem('auth_token', res.token);
//             this.loggedIn = true;
//           }
//         }),
//       );
//   }
//
//   public logout(): void {
//     localStorage.removeItem('auth_token');
//     this.loggedIn = false;
//   }
// }
