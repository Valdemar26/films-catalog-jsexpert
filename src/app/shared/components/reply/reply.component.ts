import { Component, ComponentFactoryResolver, ComponentRef, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AvatarService } from '../../services/avatar.service';
import { FilmDetailService } from '../../../films/services/film-detail.service';
import { NotificationsService } from '../toast/notification/notifications.service';
import { ToastComponent } from '../toast/toast.component';

@Component({
  selector: 'exp-reply',
  templateUrl: './reply.component.html',
  styleUrls: ['./reply.component.scss']
})
export class ReplyComponent implements OnInit {

  @ViewChild('toastContainer', { read: ViewContainerRef }) toastContainer;
  componentRef: ComponentRef<any>;

  @Input() parentRef;
  @Input() replyId: number;
  @Input() commentId: number;

  public replyForm: FormGroup;

  public avatarPath: string;

  constructor(
    private formBuilder: FormBuilder,
    private resolver: ComponentFactoryResolver,
    private avatarService: AvatarService,
    private filmDetailService: FilmDetailService,
    private notificationService: NotificationsService) { }

  public ngOnInit(): void {
    this.initReplyForm();
  }

  public confirmReply(): void {
    this.generateAvatarPath();

    this.updateForm();

    const singleReply = this.replyForm.value;

    this.filmDetailService.updateReplyList(this.commentId, this.replyId, singleReply);

    // TODO show success toast and after that clear form
    this.notificationService.showToast();
    this.showReplyToast();

    this.cancel();
  }

  public cancel(): void {
    this.replyForm.reset();
  }

  private showReplyToast(): void {
    this.toastContainer.clear();
    const factory = this.resolver.resolveComponentFactory(ToastComponent);
    this.componentRef = this.toastContainer.createComponent(factory);

    this.componentRef.instance.notification = this.componentRef;
  }

  private initReplyForm(): void {
    this.replyForm = this.formBuilder.group({
      comment: ['', Validators.required],
      username: ['', Validators.required],
      commentId: [Date.now()],
      subjectId: [this.replyId],
      avatar: this.avatarPath
    });
  }

  private generateAvatarPath(): void {
    this.avatarPath = this.avatarService.generateGravatar();
  }

  private updateForm(): void {
    this.replyForm.patchValue({
      commentId: Date.now(),
      avatar: this.avatarPath
    });
  }

}
