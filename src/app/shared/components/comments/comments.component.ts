import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Observable } from 'rxjs';

import { CommentsInterface } from '../../interfaces/comments.interface';
import { FilmDetailService } from '../../../films/services/film-detail.service';


@Component({
  selector: 'exp-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {

  @Input() subjectId: number;

  public commentsForm: FormGroup;
  public comments: CommentsInterface[] = [];
  public currentDate: any;

  constructor(private formBuilder: FormBuilder, private filmDetailService: FilmDetailService) { }

  ngOnInit(): void {
    this.initForm();
  }

  public confirm(): void {

    // TODO get 'id' from URL and set 'comment' to this 'id'
    // TODO get 'Data' and show in comment line
    // TODO add 'username' and 'honeycomb' to prevent 'bots attack'

    if (this.commentsForm.invalid) {
      return;
    }

    this.getDateNow();

    this.updateForm();

    const singleComment = this.commentsForm.value;

    this.filmDetailService.updateCommentsList(singleComment);

    // TODO show loader and after clear form
    this.cancel();
  }

  public get getCommentsList(): Observable<any[]> {
    return this.filmDetailService.getComments;
  }

  public cancel(): void {
    this.commentsForm.reset();
  }

  private initForm(): void {
    this.commentsForm = this.formBuilder.group({
      comment: ['', Validators.required],
      username: ['', Validators.required],
      commentId: [Date.now()],
      subjectId: [this.subjectId]
    });
  }

  private getDateNow(): void {
    this.currentDate = new Date();
  }

  private updateForm(): void {
    this.commentsForm.patchValue({
      commentId: Date.now(),
      subjectId: [this.subjectId]
    });
  }

}
