import {Component, ComponentFactoryResolver, ComponentRef, Input, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Observable } from 'rxjs';

import { CommentsInterface } from '../../interfaces/comments.interface';
import { FilmDetailService } from '../../../films/services/film-detail.service';
import { AvatarService } from '../../services/avatar.service';
import { ReplyComponent } from '../reply/reply.component';


@Component({
  selector: 'exp-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {

  @Input() subjectId: number;

  @ViewChild('replyContainer', { read: ViewContainerRef }) replyContainer;
  componentRef: ComponentRef<any>;

  public commentsForm: FormGroup;
  public comments: CommentsInterface[] = [];
  public currentDate: any;

  public avatarPath: string;
  public commentsLength: number;

  constructor(
    private formBuilder: FormBuilder,
    private resolver: ComponentFactoryResolver,
    private filmDetailService: FilmDetailService,
    private avatarService: AvatarService
    ) { }

  public ngOnInit(): void {
    this.initForm();
    this.initComments();
  }

  public confirm(): void {

    // TODO add 'username' and 'honeycomb' to prevent 'bots attack'

    if (this.commentsForm.invalid) {
      return;
    }

    this.getDateNow();
    this.generateAvatarPath();
    this.updateForm();

    const singleComment = this.commentsForm.value;

    this.filmDetailService.updateCommentsList(this.subjectId, singleComment);

    this.getCommentsLength(this.subjectId);

    // TODO show success tooltip and after that clear form
    this.cancel();
  }

  public get getCommentsList(): Observable<any[]> {
    return this.filmDetailService.getComments;
  }

  public cancel(): void {
    this.commentsForm.reset();
  }

  // todo generate dynamic 'reply' component with form markup
  public replyToComment(id: number): void {
    console.log(id);

    this.replyContainer.clear();
    const factory = this.resolver.resolveComponentFactory(ReplyComponent);
    this.componentRef = this.replyContainer.createComponent(factory);

    this.componentRef.instance.parentRef = this.componentRef;
  }

  private initForm(): void {
    this.commentsForm = this.formBuilder.group({
      comment: ['', Validators.required],
      username: ['', Validators.required],
      commentId: [Date.now()],
      subjectId: [this.subjectId],
      avatar: this.avatarPath
    });
  }

  private getDateNow(): void {
    this.currentDate = new Date();
  }

  private updateForm(): void {
    this.commentsForm.patchValue({
      commentId: Date.now(),
      subjectId: [this.subjectId],
      avatar: this.avatarPath
    });
  }


  private generateAvatarPath(): void {
    this.avatarPath = this.avatarService.generateGravatar();
  }


  private getCommentsLength(id): void {
    const currentComments = JSON.parse(localStorage.getItem(`comments-${id}`));

    if (currentComments) {
      this.commentsLength = currentComments.length;
    }
  }

  private initComments(): void {
    this.filmDetailService.initCommentsList(this.subjectId);
    this.getCommentsLength(this.subjectId);
  }

}
