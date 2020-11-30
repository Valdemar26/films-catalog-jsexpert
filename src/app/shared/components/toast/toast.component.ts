import { Component, HostListener, Input, ElementRef, OnDestroy, OnInit, Renderer2, ViewEncapsulation } from '@angular/core';

import { of, Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { NotificationInterface } from './interfaces/notification.interface';
import { NotificationsService } from './notification/notifications.service';


@Component({
  selector: 'exp-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ToastComponent implements OnInit, OnDestroy {

  @Input() public notification: NotificationInterface;

  private timerSubscription = new Subscription();
  private animateSubscription = new Subscription();

  constructor(
    private notificationsService: NotificationsService,
    private renderer: Renderer2,
    private el: ElementRef
  ) {
  }

  public ngOnInit(): void {
    console.log(this.notification);
    this.startTimer();
  }

  @HostListener('mouseenter')
  public mouseEnter(): void {
    if (this.notification.config.keepOnHover) {
      this.timerSubscription.unsubscribe();
    }
  }

  @HostListener('mouseleave')
  public mouseLeave(): void {
    if (this.notification.config.keepOnHover) {
      this.startTimer();
    }
  }

  @HostListener('click')
  public hideOnClick(): void {
    if (this.notification.config.hideOnClick) {
      this.close();
    }
  }

  public close(): void {

    this.renderer.addClass(this.el.nativeElement, 'exp-notification-toast-destroy');

    this.animateSubscription = of(true).pipe(
      delay(500)
    ).subscribe(() => this.notificationsService.removeToast(this.notification));
  }

  public ngOnDestroy(): void {
    this.notification.destroy$.next(true);
    this.timerSubscription.unsubscribe();
    this.animateSubscription.unsubscribe();
  }

  private startTimer(): void {

    if (!this.notification.config.duration) {
      return;
    }

    this.timerSubscription = of(true).pipe(
      delay(this.notification.config.duration)
    ).subscribe(() => this.close());
  }
}
