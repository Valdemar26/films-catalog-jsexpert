import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MessagesService } from '../../services/messages.service';
import { AuthService } from '../../../service/auth.service';

@Component({
  selector: 'exp-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  public registerForm: FormGroup;
  public userRoles = ['admin', 'manager', 'HR'];
  public role: string;

  public email: string;
  public password: string;

  private editInProgress = false;

  constructor(
    public authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    private msgService: MessagesService
  ) { }

  public ngOnInit(): void {
    // this.initRegisterForm();
    //
    // const isLogin = this.authService.isLoggedIn();
    //
    // if (isLogin) {
    //   this.router.navigate(['/main']);
    // }
  }

  // AUTH
  public signup(): any {
    this.authService.signup(this.email, this.password);
    this.email = this.password = '';
  }

  public login(): any {
    this.authService.login(this.email, this.password);
    this.email = this.password = '';
  }

  public logout(): any {
    this.authService.logout();
  }

  // private initRegisterForm(): void {
  //   this.registerForm = this.formBuilder.group({
  //     username:    ['', Validators.required],
  //     login:    ['', Validators.required],
  //     password: ['', [Validators.required, Validators.minLength(4)]]
  //   });
  // }
  //
  // registration(): void {
  //   console.log('REGISTRATION: ', this.registerForm.value.username, this.registerForm.value.login, this.registerForm.value.password);
  //
  //   this.editInProgress = false;
  //   this.authService.login(this.registerForm.value.login, this.registerForm.value.password)
  //     .subscribe(
  //       () => {
  //         this.msgService.setMessage({
  //           type: 'success',
  //           body: `${this.registerForm.value.login}, You have successfully logged in to your account. Welcome in Film Catalog!`
  //         });
  //         setTimeout(() => {
  //           this.router.navigate(['/main']);
  //         }, 2000);
  //       },
  //       err => {
  //         this.msgService.setMessage({
  //           type: 'danger',
  //           body: err.error.error
  //         });
  //       }
  //     );
  // }
  //
  //
  // public goToLogin(): void {
  //   this.router.navigate(['/login']);
  // }

}
