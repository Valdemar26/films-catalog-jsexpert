import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router) { }

  public canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const isLogged = this.authService.isLoggedIn();

    if (isLogged) {
      return true;
    } else {
      this.router.navigate(['/main']).catch((err) => console.log(err));
      return false;
    }
  }

}
