import {Component, ComponentFactoryResolver, ComponentRef, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {ToastComponent} from '../toast.component';

@Component({
  selector: 'exp-toast-overlay',
  templateUrl: './toast-overlay.component.html',
  styleUrls: ['./toast-overlay.component.scss']
})
export class ToastOverlayComponent implements OnInit {

  @ViewChild('buttonContainer', {static: true, read: ViewContainerRef}) public toastContainer: ViewContainerRef;
  componentRef: ComponentRef<any>;

  constructor(
    private resolver: ComponentFactoryResolver
  ) { }

  ngOnInit(): void {
    this.initToast();  // bad idea!
  }

  public initToast(): void {
    this.toastContainer.clear();

    const factory = this.resolver.resolveComponentFactory(ToastComponent);
    this.componentRef = this.toastContainer.createComponent(factory);

    const notificationConfig = {};
    this.componentRef.instance.notification = notificationConfig;
  }

}
