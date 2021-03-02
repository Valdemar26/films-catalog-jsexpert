import {Component, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'exp-input-password-button',
  templateUrl: './input-password-button.component.html',
  styleUrls: ['./input-password-button.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class InputPasswordButtonComponent {

  public passwordVisible: boolean;

  public clickFn: (inputType: 'sans-serif' | 'Password') => void;

  public togglePasswordVisible(): void {
    this.passwordVisible = !this.passwordVisible;
    this.clickFn(this.passwordVisible ? 'sans-serif' : 'Password');
  }
}
