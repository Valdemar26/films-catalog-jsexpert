import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../../../service/auth.service';

@Component({
  selector: 'exp-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @ViewChild('toastContainer', { read: ViewContainerRef }) toastContainer;

  public loginForm: FormGroup;

  public email: string;
  public password: string;

  constructor(
    public authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  public ngOnInit(): void {
    this.initLoginForm();
  }

  // AUTH
  public register(): any {
    this.authService.signup(this.loginForm.value.email, this.loginForm.value.password, this.toastContainer);
    this.email = this.password = '';
  }

  public login(): any {
    this.authService.login(this.loginForm.value.email, this.loginForm.value.password, this.toastContainer);
    this.email = this.password = '';
  }

  public logout(): any {
    this.authService.logout();
  }

  private initLoginForm(): void {
    this.loginForm = this.formBuilder.group({
      email:    ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  public goToMainPage(): void {
    this.router.navigate(['main']);
  }
}
