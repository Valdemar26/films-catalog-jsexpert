import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../../services/auth.service';
import { MessagesService } from '../../services/messages.service';

@Component({
  selector: 'exp-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  public errorMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    private msgService: MessagesService
  ) { }

  ngOnInit(): void {
    this.initLoginForm();

    const isLogin = this.authService.isLoggedIn();

    if (isLogin) {
      this.router.navigate(['/main']);
    }
  }

  private initLoginForm(): void {
    this.loginForm = this.formBuilder.group({
      username:    ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  public login(): void {
    this.errorMessage = '';

    console.log('LOGIN: ', this.loginForm.value.username, this.loginForm.value.password);

    this.authService.login(this.loginForm.value.username, this.loginForm.value.password)
      .subscribe(
        () => {
          this.msgService.setMessage({
            type: 'success',
            body: `${this.loginForm.value.username}, You have successfully logged in to your account. Welcome in Film Catalog!`
          });
          setTimeout(() => {
            this.router.navigate(['/main']);
          }, 2000);
        },
        err => {
          this.errorMessage = err.error.error;
          this.msgService.setMessage({
            type: 'danger',
            body: err.error.error
          });
        }
      );
  }

  public goToRegistration(): void {
    this.router.navigate(['registration']);
  }

}
