import { ComponentFactoryResolver, ComponentRef, Directive, ElementRef, OnInit, Renderer2, ViewContainerRef } from '@angular/core';

import { InputPasswordButtonComponent } from './input-password-button/input-password-button.component';

@Directive({
  selector: '[expInputPassword]'
})
export class InputPasswordDirective implements OnInit {

  private buttonComponent: ComponentRef<InputPasswordButtonComponent>;

  constructor(
    private renderer: Renderer2,
    private hostElement: ElementRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    private vcr: ViewContainerRef
  ) { }

  public ngOnInit(): void {
    this.setInputType('Password');
    this.initButtonComponent();
    this.renderer.setStyle((this.hostElement.nativeElement as HTMLElement).parentNode, 'position', 'relative');
    this.renderer.setStyle(this.hostElement.nativeElement, 'padding-right', '35px');
  }

  private initButtonComponent(): void {
    const factory = this.componentFactoryResolver.resolveComponentFactory(InputPasswordButtonComponent);
    this.buttonComponent = this.vcr.createComponent(factory);

    this.buttonComponent.instance.clickFn = this.setInputType;
  }

  private setInputType = (inputType: 'sans-serif' | 'Password') => {
    this.renderer.setStyle(this.hostElement.nativeElement, 'fontFamily', inputType);
  }
}
