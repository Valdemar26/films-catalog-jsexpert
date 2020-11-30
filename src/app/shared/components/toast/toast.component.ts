import {Component, HostListener, Input, ElementRef, OnDestroy, OnInit, Renderer2, ViewEncapsulation} from '@angular/core';

import {of, Subscription} from 'rxjs';
import {delay} from 'rxjs/operators';

import {NotificationsDataService} from '../../services/notifications-data.service';
import {NotificationInterface} from '../../interfaces/notification.interface';

@Component({
  selector: 'exp-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ToastComponent implements OnInit, OnDestroy {

  @Input() public notification: NotificationInterface;

  private _timerSubscription = new Subscription();
  private _animateSubscription = new Subscription();

  constructor(
    private _dataService: NotificationsDataService,
    private _renderer: Renderer2,
    private _el: ElementRef
  ) {
  }

  public ngOnInit(): void {
    this.startTimer();
  }

  @HostListener('mouseenter')
  public mouseEnter(): void {
    if (this.notification.config.keepOnHover) {
      this._timerSubscription.unsubscribe();
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

    this._renderer.addClass(this._el.nativeElement, 'ecc-notification-toast-destroy');

    this._animateSubscription = of(true).pipe(
      delay(500)
    ).subscribe(() => this._dataService.remove(this.notification));
  }

  public toastActionButton(notification: NotificationInterface) {
    if (notification.config.actionButton.action) {
      notification.config.actionButton.action();
    }
  }

  public ngOnDestroy(): void {
    this.notification.destroy$.next(true);
    this._timerSubscription.unsubscribe();
    this._animateSubscription.unsubscribe();
  }

  private startTimer(): void {

    if (!this.notification.config.duration) {
      return;
    }

    this._timerSubscription = of(true).pipe(
      delay(this.notification.config.duration)
    ).subscribe(() => this.close());
  }
}
