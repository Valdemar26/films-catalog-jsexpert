import {ComponentFactoryResolver, ComponentRef, Directive, ElementRef, OnInit, Renderer2, ViewContainerRef} from '@angular/core';
import {InputPasswordButtonComponent} from './input-password-button/input-password-button.component';

@Directive({
  selector: '[expInputPassword]'
})
export class InputPasswordDirective implements OnInit {

  private _buttonComponent: ComponentRef<InputPasswordButtonComponent>;

  constructor(
    private _renderer: Renderer2,
    private _hostElement: ElementRef,
    private _componentFactoryResolver: ComponentFactoryResolver,
    private _vcr: ViewContainerRef
  ) { }

  public ngOnInit(): void {
    console.log('InputPasswordDirective');
    this.setInputType('Password');
    this.initButtonComponent();
    this._renderer.setStyle((this._hostElement.nativeElement as HTMLElement).parentNode, 'position', 'relative');
    this._renderer.setStyle(this._hostElement.nativeElement, 'padding-right', '35px');
  }

  private initButtonComponent(): void {
    const factory = this._componentFactoryResolver.resolveComponentFactory(InputPasswordButtonComponent);
    this._buttonComponent = this._vcr.createComponent(factory);

    this._buttonComponent.instance.clickFn = this.setInputType;
  }

  private setInputType = (inputType: 'sans-serif' | 'Password') => {
    this._renderer.setStyle(this._hostElement.nativeElement, 'fontFamily', inputType);
  }
}
