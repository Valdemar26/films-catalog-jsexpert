import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../../../service/auth.service';

@Component({
  selector: 'exp-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  @ViewChild('toastContainer', { read: ViewContainerRef }) toastContainer;

  public registerForm: FormGroup;
  public userRoles = ['admin', 'manager', 'HR'];
  public role: string;

  public email: string;
  public password: string;

  private editInProgress = false;

  constructor(
    public authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  public ngOnInit(): void {
    this.initRegisterForm();

    const isLogin = false;
    // const isLogin = this.authService.isLoggedIn();

    if (isLogin) {
      this.router.navigate(['/main']);
    }
  }

  // AUTH
  public registration(email, password): any {
    this.authService.signup(email, password, this.toastContainer);
    this.email = this.password = '';
  }

  public login(): any {
    this.authService.login(this.email, this.password, this.toastContainer);
    this.email = this.password = '';
  }

  public logout(): any {
    this.authService.logout();
  }

  private initRegisterForm(): void {
    this.registerForm = this.formBuilder.group({
      username:    ['', Validators.required],
      email:    ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  public goToLogin(): void {
    this.router.navigate(['/login']);
  }
}
