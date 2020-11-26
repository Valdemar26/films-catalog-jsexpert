import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AvatarService } from '../../services/avatar.service';
import { FilmDetailService } from '../../../films/services/film-detail.service';

@Component({
  selector: 'exp-reply',
  templateUrl: './reply.component.html',
  styleUrls: ['./reply.component.scss']
})
export class ReplyComponent implements OnInit {

  @Input() parentRef;
  @Input() replyId: number;
  @Input() commentId: number;

  public replyForm: FormGroup;

  public avatarPath: string;

  constructor(
    private formBuilder: FormBuilder,
    private avatarService: AvatarService,
    private filmDetailService: FilmDetailService) { }

  public ngOnInit(): void {
    this.initReplyForm();
  }

  public confirmReply(): void {
    this.generateAvatarPath();

    this.updateForm();

    const singleReply = this.replyForm.value;

    this.filmDetailService.updateReplyList(this.commentId, this.replyId, singleReply);

    // TODO show success tooltip and after that clear form
    this.cancel();
  }

  public cancel(): void {
    this.replyForm.reset();
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
